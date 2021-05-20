$(function () {
    $(document).on('focus', '#semana', function () { $('#semanapicker').focus(); })
    var startDate;
    var endDate;

    var selectCurrentWeek = function (that) {
        console.log('selectCurrentWeek')
        var date = $(that).datepicker('getDate');
        console.log('date')
        console.log(date)
        var week = semana(date);
        $('#inicioSemana').val(format(week.startDate))
        $('#finalSemana').val(format(week.endDate))
        var weekString = semanaString(date);
        $('#semana').val(weekString)
		$('#semana').trigger('change')
        window.setTimeout(function () {
            $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
        }, 1);
    }
    $('.week-picker').datepicker({
        defaultDate: new Date(),
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            console.log('onSelect datepicker')
            var that = this
            selectCurrentWeek(that);
        },
        beforeShowDay: function (date) {
            var cssClass = '';
            if (date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        onChangeMonthYear: function (year, month, inst) {
            console.log('onChangeMonthYear')
            var that = this
            setTimeout(function () {selectCurrentWeek(that)}, 1)
        }
    });
    $(document).on('mousemove', '#ui-datepicker-div .ui-datepicker-calendar tr', function () { $(this).find('td a').addClass('ui-state-hover'); });
    $(document).on('mouseleave', '#ui-datepicker-div .ui-datepicker-calendar tr', function () { $(this).find('td a').removeClass('ui-state-hover'); });
});
function semana(date) {
    var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
    var week = {}
    week.startDate = startDate
    week.endDate = endDate
    return week
}
function semanaString(date) {
    var week = semana(date)
    return moment(week.startDate).locale('es').format('D/MMM') + '-' + moment(week.endDate).locale('es').format('D/MMM')
}
function format(date) {
    var fecha = moment(date).format('DD/MM/YYYY');
    return fecha
}