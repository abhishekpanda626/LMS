<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\books_users;
class BooksUsersController extends Controller
{
    function assign(Request $req)
   {
        
         $assign=new books_users;
        $assign->book_id=$req->input('book_id');
        $assign->user_id=$req->input('user_id');
        $assign->save();
        return $assign->all();
   }
   function delete($id){
    $result= books_users::where('id',$id)->delete();
    if($result)
    {
        return ['result'=>"Book has been returned."];
    }
    else
    {
        return['result'=>"Operation Failed"];
    }
}
function show($user_id)
{
    return with(books_users::where('user_id','LIKE',"%$user_id%")->get());  
}
}
