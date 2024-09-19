document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        calcularDataAbertura();
    });

    function calcularDataAbertura() {
        const inputDataRecebimento = document.getElementById('dataRecebimento').value;
        const diasTrabalhadores = parseInt(document.getElementById('diasTrabalhadores').value, 10);

        if (!inputDataRecebimento || isNaN(diasTrabalhadores)) {
            alert('Por favor, insira uma data válida e o número de dias.');
            return;
        }

        let feriados = [
            { month: 1, day: 1 },
            { month: 2, day: 13 },
            { month: 3, day: 29 },
            { month: 4, day: 21 },
            { month: 5, day: 1 },
            { month: 5, day: 30 },
            { month: 9, day: 7 },
            { month: 10, day: 12 },
            { month: 11, day: 2 },
            { month: 11, day: 15 },
            { month: 12, day: 25 }
        ];

        let date = new Date(inputDataRecebimento + "T00:00:00");
        let workingDaysFound = 0;

        while (workingDaysFound < diasTrabalhadores) {
            date.setDate(date.getDate() + 1);

            if (date.getDay() !== 0 && date.getDay() !== 6) {
                let isHoliday = feriados.some(feriado => feriado.month === date.getMonth() + 1 && feriado.day === date.getDate());

                if (!isHoliday) {
                    workingDaysFound++;
                }
            }
        }

        document.getElementById('dataAbertura').textContent = formatDate(date);
    }

    function formatDate(date) {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
});
