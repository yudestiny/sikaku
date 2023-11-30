<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Qualification extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
    ];

    /**
     * Get the steps for the post.
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'qualification_id', 'id');
    }
}
