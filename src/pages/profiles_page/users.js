import User from "../../models/user.js";
import { addItemToLocalStorage } from "../../utils/storageUtil.js";
   $(document).ready(function() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.length)
            $('.user-part').css("display","none");
        for(const user of users )
        {
            const profileCardHtml = profileCard(user.name);
            // Add data-id attribute to the profile card
            const $profileCardHtml = $(profileCardHtml); // convert the string to a jQuery object
            $($profileCardHtml).attr("data-id", user.id);
            $('.profile-cards').append($profileCardHtml);
        }
        $('.new-profile').click(function(){
            $(".overlay").toggleClass("overlay-active");
            $('.modal').fadeIn();

        });
        $(".overlay").click(function(){
            $(".overlay").toggleClass("overlay-active");
            $('.modal').fadeOut();
            
        });
        $(".modal").click(function(e){
            e.stopPropagation();
        });
        $(".modal button").click(function() {
            addProfile()
        })
   })
   const profileCard = (profileName) => 
    `
   <div class="user-card">
   <span class="delete-btn">x</span>
   <i class="fa-solid fa-user"></i>
   <div>${profileName}</div>
   </div>
   `;
function addProfile()
{

       
           const profileName = $('.modal input').val();
           if(profileName) {
                const createdUser = new User(profileName);
                const profileCardHtml = profileCard(createdUser.name);
                // Add data-id attribute to the profile card
                const $profileCardHtml = $(profileCardHtml);
                $($profileCardHtml).attr("data-id", createdUser.id);
                

               $('.profile-cards').append($profileCardHtml);
               $('.modal input').val('');
               $('.modal').fadeOut();
                $(".overlay").toggleClass("overlay-active");
                $('.user-part').css("display","none");
                addItemToLocalStorage("users", createdUser);
            }
        
    }        
        


     $('.profile-cards').on("click", '.delete-btn',function() {
         $(this).closest('.user-card').fadeOut(function() {
            $(this).remove();
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users = users.filter(user => user.id !== $(this).data("id"));

            if (!users.length)
                $('.user-part').css("display","block");
            console.log(users);
            
            localStorage.setItem("users", JSON.stringify(users));
         });
         
            
        })
        
   
  
      
   

    
        

