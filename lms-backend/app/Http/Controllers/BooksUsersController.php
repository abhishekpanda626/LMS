<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\books_users;
use Illuminate\Support\Facades\Validator;
class BooksUsersController extends Controller

{
    function assign(Request $req)
   {
    $validator= Validator::make($req->all(),[
     
        'user_id' => "unique:books_users",
    ]);
    if($validator->fails())
    {
        return response()->json(['validate_err'=>$validator->messages()],202);
    }
    
        
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
