    // تحديد متغيرات العناصر والحالة اللعبة
    let title = document.querySelector('.title'); // العنصر الذي يعرض حالة اللعبة
    let squares = []; // حالة الخانات
    let turn = 'X'; // دور اللاعب الحالي
    let gameOver = false; // مؤشر لحالة انتهاء اللعبة

    // دالة لعرض نهاية اللعبة
    function TheEnd(num1, num2, num3) {
        // عرض الفائز
        title.innerHTML = `${squares[num1]} is the winner`;
        // تغيير ألوان خلفية الخانات الفائزة
        document.getElementById('item' + num1).style.backgroundColor = '#602019';
        document.getElementById('item' + num2).style.backgroundColor = '#602019';
        document.getElementById('item' + num3).style.backgroundColor = '#602019';
        // تحديث العنوان بنقاط تتكرر كل ثانية
        setInterval(function () {
            title.innerHTML += '.';
        }, 1000);
        // إعادة تحميل الصفحة بعد 4 ثواني
        setTimeout(function () {
            location.reload();
        }, 4000);
    }

    // دالة لفحص وجود فائز أو تعادل
    function winner() {
        let draw = true; // مؤشر للتعادل

        // ملء المصفوفة squares بحالة الخانات
        for (let i = 1; i < 10; i++) {
            squares[i] = document.getElementById('item' + i).innerHTML;
            if (squares[i] === '') {
                draw = false; // إذا وجدت خانة فارغة لم يحدث تعادل
            }
        }

        // مجموعات الفوز الممكنة
        const winningCombinations = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 5, 9], [3, 5, 7]
        ];

        // التحقق من وجود فائز باستخدام مجموعات الفوز الممكنة
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (squares[a] === squares[b] && squares[b] === squares[c] && squares[a] !== '') {
                gameOver = true; // إذا وجدنا فائز
                TheEnd(a, b, c); // استدعاء دالة نهاية اللعبة
            }
        }

        // إذا لم يحدث فوز والمباراة لم تنتهي، سيتم عرض تعادل
        if (draw && !gameOver) {
            title.innerHTML = "It's a Draw!";
            setInterval(function () {
                title.innerHTML += '.';
            }, 1000);
            setTimeout(function () {
                location.reload();
            }, 4000);
        }
    }

    // دالة تنفيذ اللعبة عند النقر على الخانة
    function game(id) {
        let element = document.getElementById(id);
        if (element.innerHTML === '' && !gameOver && turn === 'X') {
            element.innerHTML = 'X';
            turn = 'O'; // تحديث دور اللاعب

            // تأخير تنفيذ حركة اللاعب O وتحديث دور اللاعب
            setTimeout(() => {
                makeRandomMoveForO();
                turn = 'X'; // تحديث دور اللاعب بعد حركة اللاعب O
            }, 500);
        }

        winner(); // فحص الفوز بعد تنفيذ الحركة
    }

    // دالة لتنفيذ استراتيجية اللعب الذكية للاعب O
    function playBoot(first, second, third) {
        let emptySquares = [];

        // تحديد الخانات الفارغة من الثلاثة المختارة
        if (squares[first] === '') {
            emptySquares.push(first);
        }
        if (squares[second] === '') {
            emptySquares.push(second);
        }
        if (squares[third] === '') {
            emptySquares.push(third);
        }

        if (emptySquares.length > 0) {
            // تنفيذ الحركة بناءً على استراتيجية الفوز
            if (squares[first] === 'X' && squares[second] === 'X') {
                playSquare(third);
            }
            else if (squares[second] === 'X' && squares[third] === 'X') {
                playSquare(first);
            }
            else if (squares[first] === 'X' && squares[third] === 'X') {
                playSquare(second);
            }
            else {
                playRandomSquare(emptySquares);
            }
        }

        winner();
    }

    // دالة للعب في خانة عشوائية من الخانات الفارغة
    function playRandomSquare(emptySquares) {
        let randomIndex = Math.floor(Math.random() * emptySquares.length);
        let randomSquare = emptySquares[randomIndex];
        playSquare(randomSquare);
    }

    // دالة لتنفيذ الحركة في خانة محددة
    function playSquare(square) {
        document.getElementById('item' + square).innerHTML = 'O';
        squares[square] = 'O';
    }

    // دالة لتنفيذ حركة عشوائية للاعب O
    function makeRandomMoveForO() {
        let emptySquares = [];

        for (let i = 1; i < 10; i++) {
            if (squares[i] === '') {
                emptySquares.push(i);
            }
        }

        if (emptySquares.length > 0) {
            let strategicCombination = findStrategicCombination();
            if (strategicCombination) {
                playBoot(strategicCombination[0], strategicCombination[1], strategicCombination[2]);
            } else {
                playRandomSquare(emptySquares);
            }
        }

        winner();
    }

    // دالة للبحث عن استراتيجية الفوز الممكنة
    function findStrategicCombination() {
        const strategicCombinations = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 5, 9], [3, 5, 7]
        ];

        for (const combo of strategicCombinations) {
            const [a, b, c] = combo;
            if ((squares[a] === 'X' && squares[b] === 'X' && squares[c] === '') ||
                (squares[a] === 'X' && squares[b] === '' && squares[c] === 'X') ||
                (squares[a] === '' && squares[b] === 'X' && squares[c] === 'X')) {
                return combo;
            }
        }

        return null;
    }
