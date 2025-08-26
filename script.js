        function switchTab(tabName) {

            const contents = document.querySelectorAll('.calculator-content');
            contents.forEach(content => {
                content.classList.remove('active');
            });

            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });

            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');

            hideAllResults();
        }

        function hideAllResults() {
            const results = document.querySelectorAll('.result');
            results.forEach(result => {
                result.classList.remove('show');
            });
        }

        function factorial(n) {
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }

        function calculateFactorial() {
            const input = document.getElementById('factorialInput');
            const resultDiv = document.getElementById('factorialResult');
            const n = parseInt(input.value);

            if (isNaN(n) || n < 0) {
                showError(resultDiv, 'Mohon masukkan bilangan bulat non-negatif!');
                return;
            }

            if (n > 20) {
                showError(resultDiv, 'Angka terlalu besar! Maksimal 20.');
                return;
            }

            const result = factorial(n);
            const calculation = n === 0 ? '0! = 1' : generateFactorialString(n);
            
            showResult(resultDiv, 'Hasil Faktorial', result, calculation);
        }

        function generateFactorialString(n) {
            if (n <= 10) {
                let str = n + '! = ';
                for (let i = n; i >= 1; i--) {
                    str += i + (i > 1 ? ' × ' : '');
                }
                return str;
            } else {
                return n + '! = ' + n + ' × ' + (n-1) + ' × ... × 2 × 1';
            }
        }

        function calculatePermutation() {
            const nInput = document.getElementById('permutationN');
            const rInput = document.getElementById('permutationR');
            const resultDiv = document.getElementById('permutationResult');
            
            const n = parseInt(nInput.value);
            const r = parseInt(rInput.value);

            if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
                showError(resultDiv, 'Mohon masukkan bilangan bulat non-negatif!');
                return;
            }

            if (r > n) {
                showError(resultDiv, 'r tidak boleh lebih besar dari n!');
                return;
            }

            if (n > 170) {
                showError(resultDiv, 'Angka terlalu besar! Maksimal 170.');
                return;
            }

            const result = factorial(n) / factorial(n - r);
            const calculation = `P(${n},${r}) = ${n}! / (${n}-${r})! = ${n}! / ${n-r}!`;
            
            showResult(resultDiv, 'Hasil Permutasi', result, calculation);
        }

        function calculateCombination() {
            const nInput = document.getElementById('combinationN');
            const rInput = document.getElementById('combinationR');
            const resultDiv = document.getElementById('combinationResult');
            
            const n = parseInt(nInput.value);
            const r = parseInt(rInput.value);

            if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
                showError(resultDiv, 'Mohon masukkan bilangan bulat non-negatif!');
                return;
            }

            if (r > n) {
                showError(resultDiv, 'r tidak boleh lebih besar dari n!');
                return;
            }

            if (n > 170) {
                showError(resultDiv, 'Angka terlalu besar! Maksimal 170.');
                return;
            }

            const result = factorial(n) / (factorial(r) * factorial(n - r));
            const calculation = `C(${n},${r}) = ${n}! / (${r}! × (${n}-${r})!) = ${n}! / (${r}! × ${n-r}!)`;
            
            showResult(resultDiv, 'Hasil Kombinasi', result, calculation);
        }

        function showResult(resultDiv, title, value, calculation) {
            resultDiv.innerHTML = `
                <h3>${title}</h3>
                <div class="result-value">${formatNumber(value)}</div>
                <div class="result-calculation">${calculation}</div>
            `;
            resultDiv.className = 'result show';
        }

        function showError(resultDiv, message) {
            resultDiv.innerHTML = `
                <h3>Error</h3>
                <div class="result-value">${message}</div>
            `;
            resultDiv.className = 'result show error';
        }

        function formatNumber(num) {
            return num.toLocaleString('id-ID');
        }

        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const activeTab = document.querySelector('.tab.active').onclick;
                if (activeTab) {
                    const tabName = activeTab.toString().match(/switchTab\('(\w+)'\)/)[1];
                    if (tabName === 'factorial') calculateFactorial();
                    else if (tabName === 'permutation') calculatePermutation();
                    else if (tabName === 'combination') calculateCombination();
                }
            }
        });