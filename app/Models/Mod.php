<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;


class Mod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'game_version',
        'author',
        'description',
        'file_path',
        'file_name',
        'file_extension',
        'file_size',
    ];

    public function servers()
    {
        return $this->belongsToMany(Server::class, 'server_mod');
    }

    public function getFullPath(): string
    {

        return Storage::disk('public')->path($this->file_path);
    }
}
