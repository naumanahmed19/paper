require('chart.js');
jQuery(function ($) {
    "use strict";
    if ($('.chart').length > 0) {

        var ctx = $(".chart");
        var $bg, $border;

        ctx.each(function () {
            var $this = $(this);
            $bg = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
            $border = [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];

            if ($this.data('type') == 'line') {
                $bg = 'rgba(255, 99, 132, 0.2)';
                $border = 'rgba(255,99,132,1)';
            }
            var myChart = new Chart($this, {
                type: $this.data('type'),
                data: {
                    labels: $this.data('labels').split(','),
                    datasets: [{
                        label: $this.data('label'),
                        data: $this.data('values').split(','),
                        backgroundColor: $bg,
                        borderColor: $border,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
    }
});