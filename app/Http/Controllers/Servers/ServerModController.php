<?php

namespace App\Http\Controllers\Servers;

use App\Http\Controllers\Controller;
use App\Models\Mod;
use App\Models\Server;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ServerModController extends Controller
{
    public function toggle(Server $server, Mod $mod): RedirectResponse
    {

        $result = $server->enabledMods()->toggle($mod->id);

        if (!empty($result['attached'])) {
            $this->copyModFile($server, $mod);
            $message = 'Mod enabled!';
        } else {
            $this->deleteModFile($server, $mod);
            $message = 'Mod disabled!';
        }

        return back()->with('success', $message);
    }

    private function copyModFile(Server $server, Mod $mod): void
    {
        $source = $mod->getFullPath();
        $destinationDir = $server->getFullServerPath() . '/mods';
        $destinationFile = $destinationDir . '/' . $mod->file_name;

        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        if (File::exists($source) && !File::exists($destinationFile)) {
            File::copy($source, $destinationFile);
        }
    }

    private function deleteModFile(Server $server, Mod $mod): void
    {
        $modFile = $server->getFullServerPath() . '/mods/' . $mod->file_name;
        if (File::exists($modFile)) {
            File::delete($modFile);
        }
    }
}
