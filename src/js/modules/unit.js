import { setMultiUnit } from "./multi";
import { setCurrentUnit } from "./current";

const $fahrenheit = document.querySelector('.units__fahrenheit');
const $celcius = document.querySelector('.units__celcius');

export const unitEventBinders = _ => {
    $fahrenheit.addEventListener('click', _ => {
        $celcius.classList.remove('units__celcius--active');
        $fahrenheit.classList.add('units__fahrenheit--active');
        setMultiUnit('us');
        setCurrentUnit('us')
    })
    
    $celcius.addEventListener('click', _ => {
        $fahrenheit.classList.remove('units__fahrenheit--active');
        $celcius.classList.add('units__celcius--active');
        setMultiUnit('si');
        setCurrentUnit('si')
    })
}
