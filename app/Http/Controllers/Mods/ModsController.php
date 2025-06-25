<?php

namespace App\Http\Controllers\Mods;

use App\Http\Controllers\Controller;
use App\Models\Mod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ModsController extends Controller
{

    public function index(): Response
    {
        $mods = Mod::latest()->get();

        return Inertia::render('admin/mods/index', [
            'mods' => $mods->toArray(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'game_version' => 'required|string|max:50',
            'author' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'mod_file' => 'required|file|mimes:jar,zip|max:50000', // 50MB
        ]);

        $file = $request->file('mod_file');
        $fileName = $file->getClientOriginalName();
        $fileExtension = $file->getClientOriginalExtension();
        $fileSize = $file->getSize();


        $filePath = $file->store('mods', 'public');

        Mod::create([
            'name' => $validatedData['name'],
            'game_version' => $validatedData['game_version'],
            'author' => $validatedData['author'],
            'description' => $validatedData['description'],
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_extension' => $fileExtension,
            'file_size' => $fileSize,
        ]);

        return back()->with('success', 'Mod uploaded successfully!');
    }

    public function destroy(Mod $mod): RedirectResponse
    {
        Storage::disk('public')->delete($mod->file_path);
        $mod->delete();
        return back()->with('success', 'Mod deleted successfully!');
    }
}
