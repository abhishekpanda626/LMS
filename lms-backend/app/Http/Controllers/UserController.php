<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function register(Request $req)
    {
       $validator= Validator::make($req->all(),[
            'name' => 'required|min:3|unique:users',
            'contact_no' => 'required|numeric',
            'email' => 'required|email|unique:users',
            'password' =>'required',
            'file_path'=>'required'
            
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()]);
        }
        $user=new User;
        $user->name=$req->input('name');
        $user->contact_no=$req->input('contact_no');        
        $user->email=$req->input('email');
        $user->password=Hash::make($req->input('password'));
        $user->file_path=$req->file('file_path')->store('user');
        $user->save();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      oken;
        return $user;
    }
    function userlogin(Request $req)
    {
        $validator= Validator::make($req->all(),[
            'email'=> 'required|email',
            'password'=>'required'
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()],202);
        }
        $user=User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password))
        {
            return response()->json([
                'error'=>["Email or password doesn't match"]
            ],206);
        }
        else
        {
            $token = $user->createToken('user-token')->accessToken;
            return $user;
        }
        
    }
    function showusers(Request $req)
    {
      
        return with(User::all());   
    }
    function delete($id){
        $result= User::where('id',$id)->delete();
        if($result)
        {
            return ['result'=>"Student has been Removed."];
        }
    }
    function getUser($id)
    {
        return User::find($id);
    }
    function update($id, Request $req)
    {
        $validator= Validator::make($req->all(),[
            'name' => 'min:3',
            'email' => 'email',
            'contact_no'=>'numeric|min:10',
            'password'=>'required',
            'file_path' =>'file',
            
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()]);
        }
        $user= User::find($id);
           
            $user->name=$req->input('name');
            $user->contact_no=$req->input('contact_no');
            $user->email=$req->input('email');
            $user->book_id=$req->input('book_id');
            $user->password=Hash::make($req->input('password'));
        if($req->file('image'))
            {$user->file_path=$req->file('image')->store('user');}
        
        
            $user->save();
                         
       
        return $user;
    }
  public  function searchUser( $name)
    {
        return User::where('name','LIKE',"%$name%")->get();
    }
}
