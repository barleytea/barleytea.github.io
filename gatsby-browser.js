import './src/styles/globals.css'
import 'prism-themes/themes/prism-dracula.css'

// Add copy button to code blocks
export const onRouteUpdate = () => {
  const codeBlocks = document.querySelectorAll('.gatsby-highlight pre')
  
  codeBlocks.forEach((pre) => {
    // Skip if already has copy button
    if (pre.querySelector('.copy-button')) {
      return
    }

    // Create copy button
    const button = document.createElement('button')
    button.className = 'copy-button'
    button.textContent = 'Copy'
    button.setAttribute('aria-label', 'Copy code to clipboard')
    
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')
      if (!code) return
      
      const text = code.textContent || ''
      
      try {
        await navigator.clipboard.writeText(text)
        button.textContent = 'Copied!'
        button.classList.add('copied')
        
        setTimeout(() => {
          button.textContent = 'Copy'
          button.classList.remove('copied')
        }, 2000)
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        
        try {
          document.execCommand('copy')
          button.textContent = 'Copied!'
          button.classList.add('copied')
          
          setTimeout(() => {
            button.textContent = 'Copy'
            button.classList.remove('copied')
          }, 2000)
        } catch (e) {
          button.textContent = 'Error'
          setTimeout(() => {
            button.textContent = 'Copy'
          }, 2000)
        }
        
        document.body.removeChild(textarea)
      }
    })
    
    // Make pre position relative for absolute positioning of button
    pre.style.position = 'relative'
    pre.appendChild(button)
  })
}
