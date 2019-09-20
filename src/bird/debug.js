import config from './config'

/**
 * 
 * @param {{
 *   min: number, 
 *   max: number,
 *   step: number,
 *   key: keyof config,
 *   label: string,
 * }} param0 
 */
const createRangeInput = ({
    min,
    max,
    step,
    key,
    label,
}) => {
    let input = document.createElement('input')
    input.type = 'range'
    input.min = min
    input.max = max
    input.step = step || 1
    input.valueAsNumber = config[key]

    input.addEventListener('change', () => {
        config[key] = input.valueAsNumber
        span.innerText = config[key]
    })

    let container = document.createElement('div')
    let span = document.createElement('span')
    span.innerText = config[key]
    container.append(input, `${label}：`, span)

    document.querySelector('#debug').append(container)
}

const debug = () => {
    createRangeInput({
        min: 5,
        max: 15,
        step: 0.5,
        label: '背景速度',
        key: 'backgroundSpeed',
    })

    createRangeInput({
        min: 1,
        max: 10,
        step: 0.5,
        label: '小鸟加速度',
        key: 'birdSpeedIncrement',
    })

    createRangeInput({
        min: 100,
        max: 200,
        step: 1,
        label: '管道间距',
        key: 'pipeGap',
    })

    createRangeInput({
        min: 500,
        max: 2000,
        step: 10,
        label: '生成管道的时间间隔',
        key: 'pipeTimeInterval',
    })
}

export default debug
