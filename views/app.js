import 'normalize.css'
import { h, render } from 'preact'

render((
    <div id='foo'>
        <span>Hello, world!</span>
        <button onClick={ _ => alert('hi!') }>Click Me</button>
    </div>
), document.body)
