import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { defaultProfile } from '../assets'

const LeftBar = ({ options, selectedTab, onTabSelect, expanded, setExpanded }) => {
    const onClick = useCallback(() => {
        setExpanded(prev => !prev)
    }, [setExpanded])

  return (
    <div id='leftBar' className={`h-[calc(100vh-73px)] p-2 border-r-[1px] bg-darkGrey border-grey flex flex-col justify-between sm:min-w-[300px] sm:max-w-[300px] ${expanded ? 'max-w-[300px] absolute top-0 left-0' : 'w-16'} select-none`}>
        <div>
            <div onClick={onClick} className='sm:hidden cursor-pointer hover:bg-fontGrey p-1 w-12 h-12 rounded-full'>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <ul className={`flex-col w-full justify-center ${expanded ? 'block' : 'hidden sm:block'} 'sm:block'`}>
                {options.map((option, index) => (
                    <li key={`${option}-${index}`} value={index} onClick={() => onTabSelect(index)} className={`flex items-center p-3 text-white rounded-md cursor-pointer hover:bg-grey my-2 ${selectedTab === index ? 'bg-grey' : ''}`}>
                        <div className='mr-3'>
                            {option.icon}
                        </div>
                        <p>{option.text}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div className='flex items-center rounded-md'>
            <div className={`mr-1 w-14 h-14 ${expanded ? 'p-2' : 'p-0'} sm:p-2 rounded-full flex justify-center items-center`}>
                <img className='w-10 h-10 object-cover rounded-full' src={defaultProfile} />                
            </div>
            <div className={`flex-col items-center text-white ${expanded ? 'block' : 'hidden sm:block'} sm:block`}>
                <h4>Pedro Fuziwara</h4>
                <p className='text-sm text-fontGrey'>fuziwarapedro@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

LeftBar.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.element.isRequired
    })),
    selectedTab: PropTypes.number.isRequired,
    onTabSelect: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    setExpanded: PropTypes.func.isRequired,
  };

export default LeftBar