<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Server extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'version',
        'status',
        'ip_address',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function enabledMods()
    {
        return $this->belongsToMany(Mod::class, 'server_mod', 'server_id', 'mod_id');
    }

    public function getServerPath(): string
    {
        return "servers/{$this->id}";
    }

    public function getFullServerPath(): string
    {
        return storage_path('app/public/' . $this->getServerPath());
    }

    public function getModsPath(): string
    {
        return $this->getServerPath() . '/mods';
    }

    public function getFullModsPath(): string
    {
        return storage_path('app/public/' . $this->getModsPath());
    }
}
