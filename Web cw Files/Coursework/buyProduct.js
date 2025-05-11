let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closecart = document.querySelector('#close-cart')

// Open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}

// Close cart
closecart.onclick = () => {
    cart.classList.remove('active')
}

// Cart working
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Making function
function ready() {
    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }
    // Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function buyButtonClicked() {
    alert("Your order is placed")
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal();
}

function removeCartItem(event) {
    var buttonOnClicked = event.target
    buttonOnClicked.parentElement.remove();
    updatetotal()
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added this to cart')
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bx-trash cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        
        // Parse the price, remove "Rs." and commas
        var price = parseFloat(priceElement.innerText.replace("Rs.", "").replace(/,/g, ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        // IF price contain some cents
        total = Math.round(total * 100) / 100;
    }

    // Update the total price display
    document.getElementsByClassName('total-price')[0].innerText = "Rs." + total.toLocaleString();
}

let output = 0;
const quizData = [
    {
        question: 'What is the primary role of a project manager?',
        options: ['To develop software', 'To manage project scope and timeline', 'To design user interfaces', 'To perform quality assurance'],
        answer: 'To manage project scope and timeline',
      },
      {
        question: 'Which of the following is a common skill for a data analyst?',
        options: ['Graphic Design', 'Data Visualization', 'Public Speaking', 'Social Media Management'],
        answer: 'Data Visualization',
      },
      {
        question: 'What does the acronym HR stand for in a business context?',
        options: ['Human Resources', 'High Risk', 'Host Registration', 'Hardware Repair'],
        answer: 'Human Resources',
      },
      {
        question: 'Which tool is commonly used for version control in software development?',
        options: ['Jira', 'Git', 'Slack', 'Trello'],
        answer: 'Git',
      },
      {
        question: 'What is the purpose of an elevator pitch?',
        options: ['To explain a project in detail', 'To give a long presentation', 'To provide a brief and persuasive summary of an idea', 'To discuss company policies'],
        answer: 'To provide a brief and persuasive summary of an idea',
      },
      {
        question: 'Which certification is often required for a cybersecurity analyst?',
        options: ['PMP', 'CISSP', 'CCNA', 'CPA'],
        answer: 'CISSP',
      },
      {
        question: 'What does KPI stand for in business management?',
        options: ['Key Performance Indicator', 'Knowledge Process Integration', 'Key Project Implementation', 'Knowledge Performance Index'],
        answer: 'Key Performance Indicator',
      },
      {
        question: 'What is a common responsibility of a human resources manager?',
        options: ['Managing IT infrastructure', 'Overseeing employee recruitment and development', 'Designing marketing strategies', 'Handling customer support'],
        answer: 'Overseeing employee recruitment and development',
      },
      {
        question: 'Which software is typically used for database management?',
        options: ['Microsoft Word', 'Photoshop', 'MySQL', 'Excel'],
        answer: 'MySQL',
      },
      {
        question: 'In a business context, what does ROI stand for?',
        options: ['Return on Investment', 'Rate of Income', 'Return on Insurance', 'Return of Information'],
        answer: 'Return on Investment',
      },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
    output = score;
}

function downloadXML(data, filename) {
    const blob = new Blob([data], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function saveResultsToXML() {
    let xmlData = `<?xml version="1.0" encoding="UTF-8"?>\n<quizResults>\n`;

    xmlData += `  <score>${score}</score>\n`;
    xmlData += `  <totalQuestions>${quizData.length}</totalQuestions>\n`;

    xmlData += '  <incorrectAnswers>\n';
    for (const answer of incorrectAnswers) {
        xmlData += `    <answer>\n`;
        xmlData += `      <question>${answer.question}</question>\n`;
        xmlData += `      <incorrect>${answer.incorrectAnswer}</incorrect>\n`;
        xmlData += `      <correct>${answer.correctAnswer}</correct>\n`;
        xmlData += `    </answer>\n`;
    }
    xmlData += '  </incorrectAnswers>\n';

    xmlData += '</quizResults>';

    downloadXML(xmlData, 'quiz_results.xml');
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;

    // Save results to XML
    saveResultsToXML();

    // Display discount based on score
    displayDiscount(score);
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
    `;
}

function displayDiscount(score) {
    let discount = 0;

    if (score >= 9) {
        discount = 20;
    } else if (score >= 7) {
        discount = 15;
    } else if (score >= 5) {
        discount = 10;
    } else if (score >= 3) {
        discount = 5;
    }

    if (discount > 0) {
        resultContainer.innerHTML += `<p>Congratulations! You have earned a ${discount}% discount on your purchase.</p>`;
    }
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
