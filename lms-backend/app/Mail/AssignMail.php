<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AssignMail extends Mailable
{
    use Queueable, SerializesModels;
  
    public $user;
 //   public $details;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    { 
     $this->user=$user;
        //$this->details=$details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Book is Assigned ')->view('Email.bookAssigned');
    }
}
