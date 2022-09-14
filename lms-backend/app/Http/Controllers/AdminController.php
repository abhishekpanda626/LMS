<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class AdminController extends Controller
{
    function adminreg(Request $req)
    {
        $validator= Validator::make($req->all(),[
            'name' => 'required|min:3|unique:admins',
            'email' => 'required|email|unique:admins',
            'password' =>'required',
            'file_path'=>'required'
            
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()]);
        }
        $admin=new Admin;
        $admin->name=$req->input('name');
        $admin->email=$req->input('email');
        $admin->password=Hash::make($req->input('password'));
        $admin->file_path=$req->file('file_path')->store('user');
        $admin->save();
        $token = $admin->createToken('signup-token')->accessToken;
        return $admin;
        
    }
    function adminlogin(Request $req)
    {
        $validator= Validator::make($req->all(),[
            'email'=> 'required|email',
            'password'=>'required'
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()],202);
        }
        $admin=Admin::where('email',$req->email)->first();
        if(!$admin || !Hash::check($req->password,$admin->password))
        {
            return response()->json([
                'error'=>["Email or password doesn't match"]
            ],206);
        }
            $token = $admin->createToken('login-token')->accessToken;
            return $admin;

       
    }
}
