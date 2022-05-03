import { defineComponent, h } from 'vue';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)
export default defineComponent({
    name: 'LineChart',
    components: { Line },
    props: {
        graphData: {
            type: Object,
        }
    },
    setup(props) {
        const chartOptions = { responsive: true };
        return () =>
            h(Line, {
                chartData: props.graphData,
                chartOptions,
                height: 400,
                width: '100%',
            })
        }
})
