<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Validator;
class BookController extends Controller
{
    function addBook(Request $req)
    {

        $validator= Validator::make($req->all(),[
            'title' => 'required|min:2|',
            'author' => 'required',
            'genre' => 'required',
            'published_date' =>'required|date',
            'file_path' => 'image'
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()]);
        }

        $book=new Book;
        $book->title=$req->input('title');
        $book->author=$req->input('author');
        $book->genre=$req->input('genre');
        $book->published_date=$req->input('published_date');
        $book->file_path=$req->file('image')->store('book');
        $book->save();
        return $book;
      //return $req->input();
    }
    function display(Request $req)
    {
        $book= new Book;
        return $book->all();
    }
    function delete($id){
        $result= Book::where('id',$id)->delete();
        if($result)
        {
            return ['result'=>"Book has been Deleted."];
        }
        else
        {
            return['result'=>"Operation Failed"];
        }
    }
    function getBook($id)
    {
        return Book::find($id);
    }
    function update($id, Request $req)
    {
        $validator= Validator::make($req->all(),[
            'title' => 'required|min:2',
            'author' => 'required',
            'genre' => 'required',
            'published_date' =>'required|date',
            
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()]);
        }
        $book= Book::find($id);
            
            $book->title=$req->input('title');
            $book->author=$req->input('author');
            $book->genre=$req->input('genre');
            $book->published_date=$req->input('published_date');
        if($req->file('image'))
        {
            $book->file_path=$req->file('image')->store('book');
        }
       
        $book->save();
        return $book;
    }
    
    public  function findBook( $title)
    {
        return Book::where('title','LIKE',"%$title%")->get();
    }

}
