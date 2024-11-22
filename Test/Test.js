// const handleChange = (e) => {
//     console.log(e.target.value)
// }

// return <input type="text" onChange={handleChange} />

const input = document.createElement('input')
input.type = 'text'
input.addEventListener('input', (e) => {
    console.log(e.target.value)
})

document.getElementById('root').appendChild(input)