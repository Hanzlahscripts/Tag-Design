// React App with Exact iVantage360 Layout
function App() {
    // Template data will come from backend - placeholder for now
    const templateData = [];
    
    // State for dropdown visibility and popup
    const [showNewDropdown, setShowNewDropdown] = React.useState(false);
    const [showOrientationPopup, setShowOrientationPopup] = React.useState(false);
    const [selectedTemplate, setSelectedTemplate] = React.useState('');
    const [selectedOrientation, setSelectedOrientation] = React.useState('Portrait'); // Default to Portrait
    const [isPopupMinimized, setIsPopupMinimized] = React.useState(false);
    const [isPopupMaximized, setIsPopupMaximized] = React.useState(false);
    
    // State for table filter dropdowns
    const [showTitleDropdown, setShowTitleDropdown] = React.useState(false);
    const [showCreatedByDropdown, setShowCreatedByDropdown] = React.useState(false);
    const [showDateCreatedDropdown, setShowDateCreatedDropdown] = React.useState(false);
    const [showDateModifiedDropdown, setShowDateModifiedDropdown] = React.useState(false);
    const [showModifiedByDropdown, setShowModifiedByDropdown] = React.useState(false);
    
    // Filter states
    const [selectedTitleFilter, setSelectedTitleFilter] = React.useState('');
    const [selectedCreatedByFilter, setSelectedCreatedByFilter] = React.useState('');
    const [selectedDateCreatedFilter, setSelectedDateCreatedFilter] = React.useState('');
    const [selectedDateModifiedFilter, setSelectedDateModifiedFilter] = React.useState('');
    const [selectedModifiedByFilter, setSelectedModifiedByFilter] = React.useState('');
    
    // Template options for New dropdown
    const templateOptions = [
        '1UP',
        '1UP (LEGAL)',
        '2UP',
        '4UP',
        '4UP(4.25 X 5.1)',
        '8UP',
        '16UP',
        '16UP',
        'Avery 5160',
        'Avery 5163',
        'Two Page',
        'Full Page'
    ];

    // Filter options - these will come from backend
    const titleOptions = ['All Titles']; // Will be populated from backend
    const createdByOptions = ['All Users', 'Admin', 'Abhisek Sinha', 'Emily Noyola']; // Will come from backend
    const dateCreatedOptions = ['All Dates']; // Will be populated from backend
    const dateModifiedOptions = ['All Dates']; // Will be populated from backend
    const modifiedByOptions = ['All Users', 'Admin', 'Abhisek Sinha', 'Emily Noyola']; // Will come from backend

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setShowNewDropdown(false);
            setShowTitleDropdown(false);
            setShowCreatedByDropdown(false);
            setShowDateCreatedDropdown(false);
            setShowDateModifiedDropdown(false);
            setShowModifiedByDropdown(false);
        };
        
        if (showNewDropdown || showTitleDropdown || showCreatedByDropdown || 
            showDateCreatedDropdown || showDateModifiedDropdown || showModifiedByDropdown) {
            document.addEventListener('click', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showNewDropdown, showTitleDropdown, showCreatedByDropdown, 
        showDateCreatedDropdown, showDateModifiedDropdown, showModifiedByDropdown]);

    // Function to create dropdown for table headers
    const createHeaderDropdown = (title, options, selectedValue, setSelectedValue, 
                                showDropdown, setShowDropdown, otherDropdownSetters, width = 'w-[12%]') => {
        const handleClick = (e) => {
            e.stopPropagation();
            // Close other dropdowns
            otherDropdownSetters.forEach(setter => setter(false));
            setShowDropdown(!showDropdown);
        };

        const handleOptionClick = (option) => {
            setSelectedValue(option);
            setShowDropdown(false);
        };

        return React.createElement('th', { 
            className: `py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis ${width} hover:bg-gray-200`,
            onClick: handleClick
        }, 
            React.createElement('div', { className: 'flex items-center justify-between' },
                React.createElement('span', null, title),
                React.createElement('span', { 
                    className: 'text-xs text-gray-500 opacity-70 ml-1',
                    style: { transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }
                }, '▼')
            ),
            showDropdown && React.createElement('div', {
                className: 'absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto',
                onClick: (e) => e.stopPropagation()
            },
                React.createElement('div', { className: 'p-2 border-b border-gray-200' },
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Search...',
                        className: 'w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    })
                ),
                React.createElement('div', { className: 'p-1' },
                    React.createElement('div', {
                        className: 'px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer flex items-center',
                        onClick: () => handleOptionClick('')
                    },
                        React.createElement('input', {
                            type: 'checkbox',
                            checked: selectedValue === '',
                            readOnly: true,
                            className: 'mr-2 w-3 h-3'
                        }),
                        'Show rows with value that:'
                    ),
                    options.map((option, index) => 
                        React.createElement('div', {
                            key: index,
                            className: 'px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center',
                            onClick: () => handleOptionClick(option)
                        },
                            React.createElement('input', {
                                type: 'checkbox',
                                checked: selectedValue === option,
                                readOnly: true,
                                className: 'mr-2 w-3 h-3'
                            }),
                            option
                        )
                    )
                ),
                React.createElement('div', { className: 'border-t border-gray-200 p-2 flex justify-between' },
                    React.createElement('button', {
                        className: 'px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded',
                        onClick: () => setShowDropdown(false)
                    }, 'Filter'),
                    React.createElement('button', {
                        className: 'px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded',
                        onClick: () => {
                            setSelectedValue('');
                            setShowDropdown(false);
                        }
                    }, 'Clear Filter')
                )
            )
        );
    };

    return React.createElement('div', { className: 'h-screen flex flex-col font-system' },
        // Header navbar
        React.createElement(SharedNavbar, { title: 'Templates' }),

        // Main layout with sidebar and content
        React.createElement('div', { className: 'flex h-[calc(100vh-70px)]' },
            // Left Sidebar
            React.createElement(SharedSidebar, {
                activePage: 'templates',
                showNewDropdown,
                setShowNewDropdown,
                setShowOrientationPopup,
                setSelectedTemplate,
                setSelectedOrientation,
                setIsPopupMinimized,
                templateOptions
            }),

            // Main Content Area
            React.createElement('div', { className: 'flex-1 flex flex-col bg-gray-100 overflow-hidden' },
                // Saved Templates Section
                React.createElement('div', { className: 'h-full flex flex-col p-4' },
                    // Section Header
                    React.createElement('div', { className: 'pb-4 flex items-center gap-3 border-b border-gray-300 min-h-[45px]' },
                        React.createElement('h2', { className: 'text-sm font-medium text-gray-800 m-0' }, 'Saved Templates'),
                        React.createElement('button', { className: 'bg-gray-300 hover:bg-gray-400 border-none text-gray-700 text-sm cursor-pointer p-0 transition-colors duration-200 flex items-center justify-center w-6 h-6' },
                            React.createElement('i', { className: 'fas fa-sync-alt' })
                        )
                    ),
                    
                    // Table Container
                    React.createElement('div', { className: 'flex-1 overflow-auto bg-white border border-gray-300' },
                        React.createElement('table', { className: 'w-full border-collapse text-sm bg-white table-fixed' },
                            // Table Header
                            React.createElement('thead', null,
                                React.createElement('tr', { className: 'bg-gray-100 border-b border-gray-300' },
                                    createHeaderDropdown(
                                        'Title', 
                                        titleOptions, 
                                        selectedTitleFilter, 
                                        setSelectedTitleFilter,
                                        showTitleDropdown,
                                        setShowTitleDropdown,
                                        [setShowCreatedByDropdown, setShowDateCreatedDropdown, setShowDateModifiedDropdown, setShowModifiedByDropdown],
                                        'w-[15%]'
                                    ),
                                    createHeaderDropdown(
                                        'Created By', 
                                        createdByOptions, 
                                        selectedCreatedByFilter, 
                                        setSelectedCreatedByFilter,
                                        showCreatedByDropdown,
                                        setShowCreatedByDropdown,
                                        [setShowTitleDropdown, setShowDateCreatedDropdown, setShowDateModifiedDropdown, setShowModifiedByDropdown]
                                    ),
                                    createHeaderDropdown(
                                        'Date Created', 
                                        dateCreatedOptions, 
                                        selectedDateCreatedFilter, 
                                        setSelectedDateCreatedFilter,
                                        showDateCreatedDropdown,
                                        setShowDateCreatedDropdown,
                                        [setShowTitleDropdown, setShowCreatedByDropdown, setShowDateModifiedDropdown, setShowModifiedByDropdown]
                                    ),
                                    createHeaderDropdown(
                                        'Date Modified', 
                                        dateModifiedOptions, 
                                        selectedDateModifiedFilter, 
                                        setSelectedDateModifiedFilter,
                                        showDateModifiedDropdown,
                                        setShowDateModifiedDropdown,
                                        [setShowTitleDropdown, setShowCreatedByDropdown, setShowDateCreatedDropdown, setShowModifiedByDropdown]
                                    ),
                                    createHeaderDropdown(
                                        'Modified By', 
                                        modifiedByOptions, 
                                        selectedModifiedByFilter, 
                                        setSelectedModifiedByFilter,
                                        showModifiedByDropdown,
                                        setShowModifiedByDropdown,
                                        [setShowTitleDropdown, setShowCreatedByDropdown, setShowDateCreatedDropdown, setShowDateModifiedDropdown]
                                    ),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Edit'),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Clone'),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Print'),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r-0 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Delete')
                                )
                            ),
                            // Table Body - Empty, data will be populated from backend
                            React.createElement('tbody', null,
                                React.createElement('tr', null,
                                    React.createElement('td', { 
                                        colSpan: 9, 
                                        className: 'text-center text-gray-500 italic py-8 text-sm' 
                                    }, 'Loading templates...')
                                )
                            )
                        )
                    )
                )
            ),

            // Shared Orientation Popup Component
            React.createElement(OrientationPopup, {
                showOrientationPopup,
                isPopupMinimized,
                isPopupMaximized,
                setIsPopupMinimized,
                setIsPopupMaximized,
                setShowOrientationPopup,
                selectedOrientation,
                setSelectedOrientation,
                selectedTemplate
            })
        )
    );
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
