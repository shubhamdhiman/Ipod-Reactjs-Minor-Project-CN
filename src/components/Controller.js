import {PlayPause, Previous, Next} from './ControllerIcons';
import '../assets/css/Controller.css';

export default function controller({ handleSelect, handleMenu }){
    // return control conatainer
    return (
        // control container
    <div id='control-container'>
        {/* Circular button */}
        <div id='circular-btn'>
            {/* ok button at center inside the circular button */}
            <div className='ok-btn' onClick={handleSelect}></div>
            {/* SkipBackward button */}
            <button style={{'--i':0}}><Previous fill='#9c0000'/></button>
            {/* menu button */}
            <button id='menu-btn'style={{'--i':1}} onClick={handleMenu}><div>Menu</div></button>
            {/* SkipForward button */}
            <button style={{'--i':2}}><Next fill='#9c0000'/></button>
            {/* PlayPause button */}
            <button style={{'--i':3}}><PlayPause fill='#9c0000'/></button>
        </div>  
    </div>
    );
}