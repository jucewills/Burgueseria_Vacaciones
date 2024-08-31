document.addEventListener('DOMContentLoaded', function() {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const calendarDays = document.getElementById('calendar-days');
    const calendarDates = document.getElementById('calendar-dates');
    const monthYear = document.getElementById('monthYear');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    const returnInput = document.getElementById('return');
    const vacationDaysInput = document.getElementById('vacation-days');

    let currentDate = new Date();
    let selectedStartDate = null;
    let selectedEndDate = null;
    let totalVacationDays = parseInt(vacationDaysInput.value); // Obtener el valor de los días de vacaciones disponibles

    function renderCalendar() {
        calendarDays.innerHTML = '';
        calendarDates.innerHTML = '';

        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.innerText = day;
            calendarDays.appendChild(dayElement);
        });

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        monthYear.innerText = `${currentDate.toLocaleString('es-ES', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            calendarDates.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.innerText = day;
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();

            // Hacer que Sábados y Domingos no sean seleccionables
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => handleDateClick(day));
            }

            calendarDates.appendChild(dayElement);
        }

        highlightSelectedDates();
    }

    function handleDateClick(day) {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return; // Evita que se seleccionen fines de semana
        }

        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            selectedStartDate = selectedDate;
            selectedEndDate = null;
            startInput.value = selectedStartDate.toISOString().split('T')[0];
            endInput.value = '';
            returnInput.value = '';
        } else if (selectedStartDate && !selectedEndDate) {
            const weekdays = countWeekdays(selectedStartDate, selectedDate);

            if (weekdays <= totalVacationDays) {
                selectedEndDate = selectedDate;
                endInput.value = selectedEndDate.toISOString().split('T')[0];
                returnInput.value = calculateReturnDate(selectedEndDate).toISOString().split('T')[0];
            } else {
                alert(`No puedes seleccionar más de ${totalVacationDays} días hábiles.`);
            }
        }

        renderCalendar();
    }

    function highlightSelectedDates() {
        const dateCells = calendarDates.querySelectorAll('div');
        dateCells.forEach(cell => {
            const cellDay = parseInt(cell.innerText, 10);
            const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), cellDay);

            if (selectedStartDate && cellDate.getTime() === selectedStartDate.getTime()) {
                cell.classList.add('selected-date');
            } else if (selectedEndDate && cellDate.getTime() === selectedEndDate.getTime()) {
                cell.classList.add('selected-date');
            } else {
                cell.classList.remove('selected-date');
            }
        });
    }

    function countWeekdays(startDate, endDate) {
        let count = 0;
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return count;
    }

    function calculateReturnDate(endDate) {
        let returnDate = new Date(endDate);
        returnDate.setDate(returnDate.getDate() + 1);
        
        // Si el siguiente día es sábado, mover al lunes
        if (returnDate.getDay() === 6) {
            returnDate.setDate(returnDate.getDate() + 2);
        } else if (returnDate.getDay() === 0) {
            returnDate.setDate(returnDate.getDate() + 1);
        }

        return returnDate;
    }

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
