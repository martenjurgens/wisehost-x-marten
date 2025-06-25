<?php

namespace App\Http\Controllers\Servers;

use App\Http\Controllers\Controller;
use App\Models\Server;
use App\Models\Mod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;
use App\Jobs\StartServerJob;
use App\Jobs\StopServerJob;

class ServerController extends Controller
{
    public function index(): Response
    {
        $servers = Auth::user()->servers;

        return Inertia::render('servers/servers-list', [
            'servers' => $servers->toArray(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'version' => 'required|string|max:50',
        ]);

        $server = Auth::user()->servers()->create([
            'name' => $validatedData['name'],
            'version' => $validatedData['version'],
            'ip_address' => $this->generateRandomIpAddress(),
        ]);

        $this->createServerFolders($server);

        return redirect()->route('servers.index')->with('success', 'Server created successfully!');
    }


    public function show(Server $server): RedirectResponse
    {
        return redirect()->route('servers.settings', $server);
    }

    public function updateSettings(Request $request, Server $server): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        $server->update($validated);

        return back()->with('success', 'Settings saved successfully!');
    }


    public function showSettings(Server $server): Response
    {
        return Inertia::render('server/settings', [
            'server' => $server,
        ]);
    }

    public function showMods(Server $server): Response
    {
        $enabledModIds = $server->enabledMods()->pluck('mods.id')->all();

        $allMods = Mod::all()->map(function ($mod) use ($enabledModIds) {
            $mod->is_enabled = in_array($mod->id, $enabledModIds);
            return $mod;
        });

        return Inertia::render('server/mods', [
            'server' => $server,
            'mods' => $allMods,
        ]);
    }


    public function showFiles(Server $server): Response
    {
        $basePath = $server->getFullServerPath();
        $files = $this->buildFileTree($basePath);

        return Inertia::render('server/file-manager', [
            'server' => $server,
            'files' => $files,
        ]);
    }

    public function showConsole(Server $server): Response
    {
        return Inertia::render('server/console', [
            'server' => $server,
        ]);
    }

    public function start(Server $server): RedirectResponse
    {
        if ($server->status !== 'offline') {
            return back()->with('error', 'Server cannot be started in its current state.');
        }

        $server->update(['status' => 'starting']);
        StartServerJob::dispatch($server);
        return back()->with('success', 'Server is starting...');
    }

    public function stop(Server $server): RedirectResponse
    {
        if ($server->status !== 'online') {
            return back()->with('error', 'Server cannot be stopped in its current state.');
        }

        $server->update(['status' => 'stopping']);
        StopServerJob::dispatch($server);
        return back()->with('success', 'Server is stopping...');
    }


    private function createServerFolders($server): void
    {
        $basePath = $server->getFullServerPath();

        File::makeDirectory($basePath, 0755, true);
        File::makeDirectory($basePath . '/mods', 0755, true);
        File::makeDirectory($basePath . '/plugins', 0755, true);
        File::makeDirectory($basePath . '/world', 0755, true);
        File::makeDirectory($basePath . '/config', 0755, true);

        File::put($basePath . '/server.properties', $this->getDefaultServerProperties());
        File::put($basePath . '/whitelist.json', '[]');
        File::put($basePath . '/ops.json', '[]');
    }

    private function getDefaultServerProperties(): string
    {
        return "# Minecraft server properties\n" .
            "server-port=25565\n" .
            "gamemode=survival\n" .
            "difficulty=easy\n" .
            "spawn-protection=16\n" .
            "max-players=20\n" .
            "online-mode=true\n" .
            "white-list=false\n";
    }

    private function generateRandomIpAddress(): string
    {
        return '192.168.' . rand(0, 255) . '.' . rand(1, 254);
    }

    private function buildFileTree(string $path): array
    {
        if (!File::exists($path)) {
            return [];
        }

        $tree = [];
        $items = scandir($path);

        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }

            $fullPath = $path . '/' . $item;
            $node = [
                'name' => $item,
                'path' => $fullPath,
                'type' => File::isDirectory($fullPath) ? 'directory' : 'file',
            ];

            if ($node['type'] === 'directory') {
                $node['children'] = $this->buildFileTree($fullPath);
            }

            $tree[] = $node;
        }

        return $tree;
    }
}
