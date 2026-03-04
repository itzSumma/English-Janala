

const createElements=(arr)=>{
    const htmlElements = arr.map((elem)=> `<span class="btn">${elem}</span>`);
    console.log(htmlElements.join(" "));
}

const synonyms = ["hi","hello","greet"];
createElements(synonyms);