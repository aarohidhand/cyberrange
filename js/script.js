// Navbar scroll effect

window.addEventListener("scroll", function(){

    let navbar = document.querySelector(".navbar");
    
    if(window.scrollY > 50){
    navbar.style.background = "#0B192C";
    }
    else{
    navbar.style.background = "rgba(0,0,0,0.7)";
    }
    
    });

window.addEventListener("scroll", () => {

const navbar = document.querySelector(".navbar");

if(window.scrollY > 40){
navbar.style.background = "rgba(11,25,44,0.75)";
}
else{
navbar.style.background = "rgba(11,25,44,0.35)";
}

});
