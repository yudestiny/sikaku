<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Post extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'qualification_id',
        'favorite_number',
        'start_date',
        'target',
        'description',
        'service_id',
        'status_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_date' => 'date',
        'id' => 'string',
    ];

    protected $date = [
        'created_at'
    ];

    /**
     * Get the user that owns the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get the qualification that the post belongs to.
     */
    public function qualification()
    {
        return $this->belongsTo(Qualification::class, 'qualification_id', 'id');
    }

    /**
     * Get the service that the post belongs to.
     */
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }

    /**
     * Get the status that the post belongs to.
     */
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'id');
    }

    /**
     * Get the steps for the post.
     */
    public function steps()
    {
        return $this->hasMany(Step::class, 'post_id', 'id')->leftJoin('services', 'steps.service_id', '=', 'services.id')
            ->orderBy('step_number');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'post_id', 'id');
    }

}
