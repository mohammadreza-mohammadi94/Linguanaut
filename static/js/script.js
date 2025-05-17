document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const inputText = document.getElementById('input-text');
    const translateBtn = document.getElementById('translate-btn');
    const summarizeBtn = document.getElementById('summarize-btn');
    const clearBtn = document.getElementById('clear-btn');
    const translationOutput = document.getElementById('translation-output');
    const summaryOutput = document.getElementById('summary-output');
    const loader = document.getElementById('loader');

    // Translate functionality
    translateBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) {
            showError('Please enter some text to translate.');
            return;
        }
        
        toggleLoader(true);
        
        fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            translationOutput.textContent = data.translation;
            translationOutput.classList.add('highlight');
            setTimeout(() => {
                translationOutput.classList.remove('highlight');
            }, 1500);
        })
        .catch(error => {
            showError('Error translating text: ' + error.message);
            console.error('Error:', error);
        })
        .finally(() => {
            toggleLoader(false);
        });
    });

    // Summarize functionality
    summarizeBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) {
            showError('Please enter some text to summarize.');
            return;
        }
        
        toggleLoader(true);
        
        fetch('/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            summaryOutput.textContent = data.summary;
            summaryOutput.classList.add('highlight');
            setTimeout(() => {
                summaryOutput.classList.remove('highlight');
            }, 1500);
        })
        .catch(error => {
            showError('Error summarizing text: ' + error.message);
            console.error('Error:', error);
        })
        .finally(() => {
            toggleLoader(false);
        });
    });

    // Clear functionality
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        translationOutput.textContent = '';
        summaryOutput.textContent = '';
        
        // Button animation
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });

    // Toggle loader
    function toggleLoader(show) {
        loader.style.display = show ? 'flex' : 'none';
    }

    // Show error
    function showError(message) {
        alert(message);
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for the ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .highlight {
            animation: highlight 1.5s ease;
        }
        
        @keyframes highlight {
            0% { background-color: rgba(37, 117, 252, 0.1); }
            100% { background-color: transparent; }
        }
        
        .clicked {
            transform: scale(0.98);
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});