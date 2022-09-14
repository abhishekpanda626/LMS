<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class books_users extends Model
{
    public $timestamps=false;
    use HasFactory;
    protected $fillable = [
        'book_id',
        'user_id'
    ];
    protected $with=['book'];
    public function user()
   {
       return $this->belongsTo(User::class);
   }
   public function book()
   {
       return $this->belongsTo(Book::class);
   }
}
