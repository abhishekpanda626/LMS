<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\books_users;
use App\Models\Book;
use App\Models\User;
use App\Mail\AssignMail;
//use App\Http\Controller\MailController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class BooksUsersController extends Controller

{
    
    function assign(Request $req)
   {
    $user_id_exist=books_users::where('user_id','=',$req->user_id)->first();
    $book_id_exist=books_users::where('book_id','=',$req->book_id)->first();
    
    if($user_id_exist && $book_id_exist )
    {
        return response()->json(['error'=>"value exist, Can't add duplicate value" ],202);
    }
  else{
         $assign=new books_users;
        $assign->book_id=$req->input('book_id');
        $assign->user_id=$req->input('user_id');
        
        $assign->save();
               
            $books = with(books_users::where('id','LIKE',"%$assign->user_id%")->first());
            $title =$books->book->title;
            $name=$books->user->name;
            $email=$books->user->email;
            $message=['name'=>$name,'title'=>$title];
            
    Mail::to($email,$name)->send(new AssignMail($message));
        return $assign; 
  }
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
// public function sendmail()
//     {
   
//     return "mail sent";
//     //     Mail::send('Email.bookAssigned', $assign->toArray(), function ($message) {
//     //         $message->from('book@lms.com', 'admin_lms');
//     // //      $message->sender('john@johndoe.com', 'John Doe');
//     //         $message->to( "sender@gmail.com", "sender");
//     // //        $message->cc('john@johndoe.com', 'John Doe');
//     // //         $message->bcc('john@johndoe.com', 'John Doe');
//     //       $message->replyTo('john@johndoe.com', 'John Doe');  
//     //         $message->subject("Book is assigned" );      
//     //     //    $message->priority(3);
//     //      //   $message->attach('pathToFile');
//     //     });
//     }


}
