// React App for Store Tags Page
function StoreTagsApp() {
    // State for dropdown visibility and popup
    const [showNewDropdown, setShowNewDropdown] = React.useState(false);
    const [showOrientationPopup, setShowOrientationPopup] = React.useState(false);
    const [selectedTemplate, setSelectedTemplate] = React.useState('');
    const [selectedOrientation, setSelectedOrientation] = React.useState('Portrait');
    const [isPopupMinimized, setIsPopupMinimized] = React.useState(false);
    const [isPopupMaximized, setIsPopupMaximized] = React.useState(false);
    
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

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setShowNewDropdown(false);
        };
        
        if (showNewDropdown) {
            document.addEventListener('click', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showNewDropdown]);

    return React.createElement('div', { className: 'h-screen flex flex-col font-system' },
        // Header navbar
        React.createElement(SharedNavbar, { title: 'Store Tags' }),

        // Main layout with sidebar and content
        React.createElement('div', { className: 'flex h-[calc(100vh-70px)]' },
            // Left Sidebar
            React.createElement(SharedSidebar, {
                activePage: 'store-tags',
                showNewDropdown,
                setShowNewDropdown,
                setShowOrientationPopup,
                setSelectedTemplate,
                setSelectedOrientation,
                setIsPopupMinimized,
                templateOptions
            }),

            // Main Content Area
            React.createElement('div', { className: 'flex-1 p-0 bg-white flex flex-col overflow-hidden' },
                // Filter Bar Section
                React.createElement('div', { className: 'bg-white py-3 px-4 border-b border-gray-300 flex justify-between items-center flex-wrap gap-3' },
                    React.createElement('div', { className: 'flex items-center gap-4 flex-wrap' },
                        // Filter Sequences Label (not dropdown)
                        React.createElement('div', { className: 'flex items-center' },
                            React.createElement('span', { 
                                className: 'text-sm text-gray-700 font-medium',
                                style: { fontSize: '13px' }
                            }, 'Filter Sequences')
                        ),
                        
                        // Select Store Dropdown with underline style
                        React.createElement('div', { className: 'relative flex items-center' },
                            React.createElement('select', { 
                                className: 'py-1 px-2 bg-transparent border-0 border-b border-gray-400 text-sm text-gray-700 min-w-[140px] cursor-pointer focus:outline-none focus:border-blue-500 appearance-none',
                                style: { fontSize: '13px', paddingRight: '20px' }
                            },
                                React.createElement('option', null, '... Select Store ...')
                            ),
                            React.createElement('i', { 
                                className: 'fas fa-chevron-down absolute right-1 text-gray-500 text-xs pointer-events-none' 
                            })
                        ),
                        
                        // Select Tag Dropdown with underline style
                        React.createElement('div', { className: 'relative flex items-center' },
                            React.createElement('select', { 
                                className: 'py-1 px-2 bg-transparent border-0 border-b border-gray-400 text-sm text-gray-700 min-w-[140px] cursor-pointer focus:outline-none focus:border-blue-500 appearance-none',
                                style: { fontSize: '13px', paddingRight: '20px' }
                            },
                                React.createElement('option', null, '... Select Tag ...')
                            ),
                            React.createElement('i', { 
                                className: 'fas fa-chevron-down absolute right-1 text-gray-500 text-xs pointer-events-none' 
                            })
                        ),
                        
                        // Refresh Button with proper green styling
                        React.createElement('button', { 
                            className: 'bg-[#90ee90] hover:bg-green-400 text-black border-none py-5 px-3 text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200',
                            style: { fontSize: '12px', height: '32px' }
                        },
                            React.createElement('i', { className: 'fas fa-sync-alt text-xs' }),
                            React.createElement('span', null, 'Refresh')
                        ),
                        
                        // Search Box with proper styling
                        React.createElement('div', { className: 'relative flex items-center' },
                            React.createElement('i', { className: 'fas fa-search absolute left-3 text-gray-500 text-sm' }),
                            React.createElement('input', { 
                                type: 'text', 
                                className: 'py-2 pl-10 pr-3 border border-gray-400 bg-white text-sm min-w-[200px] focus:outline-none focus:border-blue-500',
                                style: { fontSize: '13px', height: '32px' },
                                placeholder: ''
                            })
                        )
                    ),
                    
                    // Select All / Deselect All buttons with proper styling
                    React.createElement('div', { className: 'flex items-center gap-3' },
                        React.createElement('button', { 
                            className: 'bg-white hover:bg-[#e1e1e1]text-black border border-gray-400 py-2 px-4 text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200',
                            style: { fontSize: '12px', height: '32px' }
                        },
                            React.createElement('i', { className: 'fa-solid fa-check-double text-sm' }),
                            React.createElement('span', null, 'Select All')
                        ),
                        React.createElement('button', { 
                            className: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-400 py-2 px-4 text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200',
                            style: { fontSize: '12px', height: '32px' }
                        },
                            React.createElement('i', { className: 'far fa-square text-sm' }),
                            React.createElement('span', null, 'Deselect All')
                        )
                    )
                ),
                
                // Pagination Controls
                React.createElement('div', { className: 'bg-gray-50 px-4 py-2 border-b border-gray-300 flex justify-between items-center' },
                    React.createElement('div', { className: 'flex items-center gap-1' },
                        React.createElement('button', { 
                            className: 'bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200',
                            style: { width: '24px', height: '22px' }
                        },
                            React.createElement('i', { className: 'fas fa-angle-double-left text-xs' })
                        ),
                        React.createElement('button', { 
                            className: 'bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200',
                            style: { width: '24px', height: '22px' }
                        },
                            React.createElement('i', { className: 'fas fa-angle-left text-xs' })
                        ),
                        React.createElement('button', { 
                            className: 'bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200',
                            style: { width: '24px', height: '22px' }
                        },
                            React.createElement('i', { className: 'fas fa-angle-right text-xs' })
                        ),
                        React.createElement('button', { 
                            className: 'bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200',
                            style: { width: '24px', height: '22px' }
                        },
                            React.createElement('i', { className: 'fas fa-angle-double-right text-xs' })
                        )
                    ),
                    React.createElement('div', { className: 'flex items-center gap-1 text-sm text-gray-700' },
                        React.createElement('span', { style: { fontSize: '12px' } }, 'Page'),
                        React.createElement('input', { 
                            type: 'text', 
                            className: 'border border-gray-400 px-1 py-0 w-8 text-center text-sm',
                            style: { height: '18px', fontSize: '11px' },
                            value: '1'
                        }),
                        React.createElement('span', { style: { fontSize: '12px' } }, 'of 1')
                    )
                ),
                
                // Data Table
                React.createElement('div', { className: 'flex-1 overflow-auto bg-white border-l border-r border-gray-300' },
                    React.createElement('table', { className: 'w-full border-collapse text-sm bg-white' },
                        // Table Header
                        React.createElement('thead', null,
                            React.createElement('tr', { className: 'bg-gray-100' },
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer',
                                    style: { width: '40px' }
                                },
                                    React.createElement('span', null, 'Sel'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                ),
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200',
                                    style: { width: '80px' }
                                },
                                    React.createElement('span', null, 'BC #'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                ),
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200',
                                    style: { width: '120px' }
                                },
                                    React.createElement('span', null, 'Item'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                ),
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200',
                                    style: { minWidth: '200px' }
                                },
                                    React.createElement('span', null, 'Description'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                ),
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200',
                                    style: { width: '120px' }
                                },
                                    React.createElement('span', null, 'Template'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                ),
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200',
                                    style: { width: '120px' }
                                },
                                    React.createElement('span', null, 'Date Created'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                ),
                                React.createElement('th', { 
                                    className: 'py-2 px-2 text-left font-medium text-gray-600 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200',
                                    style: { width: '120px' }
                                },
                                    React.createElement('span', null, 'Created By'),
                                    React.createElement('i', { className: 'fas fa-sort ml-1 text-gray-400 text-xs' })
                                )
                            )
                        ),
                        // Table Body - Empty for now
                        React.createElement('tbody', null,
                            React.createElement('tr', null,
                                React.createElement('td', { 
                                    colSpan: 7, 
                                    className: 'text-center text-gray-500 italic py-8 text-sm border-b border-gray-300' 
                                }, 'No data available')
                            )
                        )
                    )
                ),
                
                // Bottom Action Buttons - Centered with proper container
                React.createElement('div', { className: 'bg-white py-6 px-4 flex justify-center border-t border-gray-300' },
                    React.createElement('div', { className: 'bg-orange-200 p-4 rounded flex gap-4 justify-center shadow-sm' },
                        React.createElement('button', { 
                            className: 'bg-[#e6d4b9] hover:bg-[#d8c6ab] border-none py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200',
                            style: { fontSize: '12px' }
                        },
                            React.createElement('i', { className: 'fas fa-print text-sm text-black' }),
                            React.createElement('span', { className: 'text-black' }, 'Print Selected')
                        ),
                        React.createElement('button', { 
                            className: 'bg-[#e6d4b9] hover:bg-[#d8c6ab] text-black py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200',
                            style: { fontSize: '12px' }
                        },
                            React.createElement('i', { className: 'fas fa-print text-sm text-black' }),
                            React.createElement('span', { className: 'text-black' }, 'Print All')
                        ),
                        React.createElement('button', { 
                            className: 'bg-[#e6d4b9] hover:bg-[#d8c6ab] border-none py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200',
                            style: { fontSize: '12px' }
                        },
                            React.createElement('i', { className: 'fas fa-trash text-sm text-black' }),
                            React.createElement('span', { className: 'text-black' }, 'Delete Selected')
                        ),
                        React.createElement('button', { 
                            className: 'bg-[#e6d4b9] hover:bg-[#d8c6ab] border-none py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200',
                            style: { fontSize: '12px' }
                        },
                            React.createElement('i', { className: 'fas fa-cog text-sm text-black'}),
                            React.createElement('span', { className: 'text-black' }, 'Settings')
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
root.render(React.createElement(StoreTagsApp));
