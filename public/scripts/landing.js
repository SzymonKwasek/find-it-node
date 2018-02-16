var jumbotron = document.querySelector(".jumbotron");

var images = [
        "https://images.unsplash.com/photo-1508182314998-3bd49473002f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af394daae4bdbc4a95dc2204984b790d&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/uploads/14128324071271c853818/3765c625?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb9fdc80e4e0172a831d11c76aa1782a&auto=format&fit=crop&w=1351&q=80",
        "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=330f47db0730dfb2f0017d3b5eb1417d&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1516703914899-e8303d01329a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b544282e40e1ddee968dac7188ae9a3e&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c77048665aa9e6be7b79e71f39a26697&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1484795819573-86ae049cb815?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3c2f1a5ca30bb23b6db35b356305d307&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1507830075634-ce51e8b19328?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c87f7939c25a0ef26b2aa449b2aa380&auto=format&fit=crop&w=1350&q=80"
        ]
    
    
var i = 0;
    
function slideimg() {
    setTimeout(function () {
        jumbotron.style.backgroundImage('url('+images[i]+")")
        // $('.jumbotron').css('background-image', 'url('+images[i]+")");
        i++;
        if(i==images.length) i=0;
        slideimg();
    }, 5000);
}
    
slideimg();