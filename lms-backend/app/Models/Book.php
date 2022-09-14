<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{   
    use HasFactory;
    protected $fillable = [
        'title',
        'author',
        'genre',
        'published_date',
        'file_path'
    ];

   public function user()
   {
       return $this->hasMany(User::class);
   }
   public function books_users()
   {
       return $this->hasMany(books_users::class);
   }
   public $timestamps=false;
}
