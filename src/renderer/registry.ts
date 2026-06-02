import ButtonWidget from '../components/widgets/ButtonWidget.vue'
import InputWidget from '../components/widgets/InputWidget.vue'
import RowWidget from '../components/widgets/RowWidget.vue'
import ColWidget from '../components/widgets/ColWidget.vue'
import TextWidget from '../components/widgets/TextWidget.vue'
import ImageWidget from '../components/widgets/ImageWidget.vue'
import SelectWidget from '../components/widgets/SelectWidget.vue'
import DatePickerWidget from '../components/widgets/DatePickerWidget.vue'

import ChartWidget from '../components/widgets/ChartWidget.vue'

export const registry = {
  button: ButtonWidget,
  input: InputWidget,
  row: RowWidget,
  col: ColWidget,
  chart: ChartWidget,
  text: TextWidget,
  image: ImageWidget,
  select: SelectWidget,
  datePicker: DatePickerWidget
}