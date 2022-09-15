<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\books_users;
use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
class BooksUsersController extends Controller

{
    function assign(Request $req)
   {
    $validator= Validator::make($req->all(),[
     
        'user_id' => "required",
    ]);
    if($validator->fails())
    {
        return response()->json(['validate_err'=>$validator->messages()],202);
    }
    
        
         $assign=new books_users;
        $assign->book_id=$req->input('book_id');
        $assign->user_id=$req->input('user_id');
        
        $assign->save();
               
            $books = with(books_users::where('id','LIKE',"%$assign->user_id%")->first());
         //   $title=$books->book->title;
           $mail=$books->user->email;
        Mail::send('Email.bookAssigned', $assign->toArray(), function ($message) {
            $message->from('book@lms.com', 'admin_lms');
    //      $message->sender('john@johndoe.com', 'John Doe');
            $message->to( "sender@gmail.com", "sender");
   //         $message->cc('john@johndoe.com', 'John Doe');
   //         $message->bcc('john@johndoe.com', 'John Doe');
  //          $message->replyTo('john@johndoe.com', 'John Doe');  
            $message->subject("Book is assigned" );      
        //    $message->priority(3);
         //   $message->attach('pathToFile');
        });
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
