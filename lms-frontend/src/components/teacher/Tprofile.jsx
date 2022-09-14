export default function Profile()
{
    return(
        <div className="container d-flex justify-content-center align-items-center">
        <div className="card py-4">

           <div className="d-flex justify-content-center align-items-center">
             <div className="round-image">
               <img src="https://i.imgur.com/Mn9kglf.jpg" className="rounded-circle" width="97"/>
             </div>
           </div>

           <div className="text-center">

             <h4 className="mt-3">Noora Smith</h4>
             <span>Account Manager</span>

             <div className="px-5">
               <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>

               <button className="btn btn-primary follow">Follow Me</button>
             </div>
           </div>
          
        </div>
         </div>
    )
}