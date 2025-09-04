import { ClipboardIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Vista de Tarjetas', href: '/records', icon: UserIcon },
    { name: 'Vista de Tabla', href: '/records/table', icon: ClipboardIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value)
    }

    return (
        <div className='mb-8'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Selecciona una vista
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    onChange={handleChange}
                    value={location.pathname}
                >
                    {tabs.map((tab) => (
                        <option 
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                    <nav className="flex space-x-1" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'bg-blue-50 border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                                    'group inline-flex items-center rounded-lg border px-4 py-3 text-sm font-medium transition-all'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                        'mr-2 h-4 w-4'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}