let i = 0;
let co = 0;
let Quiz = []
let h4 = document.querySelector("h4");
let li = document.querySelectorAll("li");
let timer;
function renderQuestion(index){
    const question = Quiz[index];
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<h3>${i+1}-${question.question}</h3>`;
    let arr = [0,1,2,3];
    for(let k = 0;k < question.options.length;k++){
        let random = Math.floor(Math.random() * arr.length);
        let ra = arr[random];
        let p = document.createElement("p");
        p.textContent = question.options[ra];
        arr.splice(random,1);
        div.appendChild(p);
    }
    let next = document.createElement("span");
    next.textContent = "Next";
    div.appendChild(next);
    li[i].className = '';
    if(li[i].className == ""){
        next.className = "disabled";
    }
    document.body.appendChild(div);
    let p = document.querySelectorAll("p");
    for(let j = 0;j < p.length;j++){
        p[j].onclick = function(e){
            next.classList.remove("disabled");
            if(e.target.textContent !== question.answer){
                e.target.className = "false";
                li[i].className = "not-active";
                for(let k = 0;k < p.length;k++){
                    if(p[k].textContent == question.answer){
                        p[k].className = "correct";
                    }
                }
            }else if(e.target.textContent == question.answer){
                e.target.className = "correct";
                li[i].className = "active";
                co++;
            }
        }
    }
    Quiz.splice(index,1);
    next.addEventListener("click",function(){
        if(next.className == "" || h4.textContent == 0){
        if(i < 9){
            let random = Math.floor(Math.random() * Quiz.length);
            if(li[i].className == "active"){
                li[i].className = "active" 
            }else if(li[i].className == "not-active" || li[i].className == ""){
                li[i].className = "not-active" 
            }
            h4.textContent = 20;
            i++;
            document.body.removeChild(div);
            renderQuestion(random);
        }else if(co == 5){
            document.body.innerHTML = `<h1>Your Final Result is ${co}/10</h1><p>Your Result Is Average</p>`
        }else if(co < 5){
            document.body.innerHTML = `<h1>Your Final Result is ${co}/10</h1><p>Your Result Is Bad</p>`
        }else{
            document.body.innerHTML = `<h1>Your Final Result is ${co}/10</h1><p>Your Result Is Good</p>`
        }
    }
    })
    startTimer(next);
}
function startTimer(nextButton) {
    clearInterval(timer);
    timer = setInterval(function() {
        h4.textContent--;
        if(h4.textContent == 0){
            clearInterval(timer);
            nextButton.click();
        }
    },1000);
}
fetch("js/main.json").then(Response => Response.json()).then(data => {
    Quiz = data.quiz;
    let random = Math.floor(Math.random() * Quiz.length);
    li[i] = renderQuestion(random);
})

