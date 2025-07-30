// Shared Components for all pages
function SharedNavbar({ title }) {
    return React.createElement('div', { 
        className: 'bg-gradient-to-br from-orange-primary to-orange-secondary text-black px-6 py-4 shadow-lg flex items-center justify-start h-[70px]' 
    },
        React.createElement('div', { className: 'flex items-center gap-3' },
            React.createElement('i', { 
                className: 'fas fa-copy text-3xl text-black bg-none bg-opacity-15 p-2 rounded-md w-9 h-9 flex items-center justify-center' 
            }),
            React.createElement('h1', { className: 'text-3xl font-semibold tracking-wide text-black' }, title)
        )
    );
}

function SharedSidebar({ activePage, showNewDropdown, setShowNewDropdown, setShowOrientationPopup, setSelectedTemplate, setSelectedOrientation, setIsPopupMinimized, templateOptions }) {
    const navigateToPage = (page) => {
        if (page === 'templates' && window.location.pathname.includes('store-tags')) {
            window.location.href = 'index.html';
        } else if (page === 'store-tags' && !window.location.pathname.includes('store-tags')) {
            window.location.href = 'store-tags.html';
        }
    };

    return React.createElement('div', { 
        className: 'w-[80px] bg-orange-primary flex flex-col justify-between p-0 shadow-lg flex-shrink-0' 
    },
        // Top section buttons
        React.createElement('div', { className: 'flex flex-col' },
            // New button with dropdown
            React.createElement('div', { 
                className: `flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 relative hover:bg-white hover:bg-opacity-10`,
                onClick: (e) => {
                    e.stopPropagation();
                    setShowNewDropdown(!showNewDropdown);
                }
            },
                React.createElement('i', { className: 'fas fa-file-plus text-lg mb-1 opacity-90' }),
                React.createElement('span', { className: 'text-xs font-medium leading-tight opacity-95' }, 'New'),
                React.createElement('i', { 
                    className: `fas fa-chevron-${showNewDropdown ? 'up' : 'down'} absolute bottom-2 right-2 text-xs opacity-80 transition-transform duration-200` 
                }),
                // Dropdown menu
                showNewDropdown && React.createElement('div', { 
                    className: 'absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-32 max-w-36' 
                },
                    templateOptions.map((option, index) =>
                        React.createElement('div', { 
                            key: index,
                            className: 'flex items-center gap-1 px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer',
                            onClick: (e) => {
                                e.stopPropagation();
                                setSelectedTemplate(option);
                                setShowNewDropdown(false);
                                setShowOrientationPopup(true);
                                setSelectedOrientation('Portrait');
                                setIsPopupMinimized(false);
                            }
                        },
                            React.createElement('i', { className: 'fas fa-file-medical text-black text-lg' }),
                            React.createElement('span', { className: 'text-xs font-medium' }, option)
                        )
                    )
                )
            ),
            React.createElement('div', { 
                className: `flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10`,
                onClick: () => navigateToPage('templates')
            },
                React.createElement('i', { className: 'fas fa-list text-lg mb-1 opacity-90' }),
                React.createElement('span', { className: 'text-xs font-medium leading-tight opacity-95' }, 'List')
            ),
            React.createElement('div', { 
                className: `flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10`,
                onClick: () => navigateToPage('store-tags')
            },
                React.createElement('i', { className: 'fas fa-tags text-lg mb-1 opacity-90' }),
                React.createElement('span', { className: 'text-xs font-medium leading-tight opacity-95' }, 'Store Tags')
            )
        ),
        
        // Bottom section buttons
        React.createElement('div', { className: 'flex flex-col mt-auto' },
            React.createElement('div', { className: 'flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10' },
                React.createElement('i', { className: 'fas fa-chart-line text-lg mb-1 opacity-90' }),
                React.createElement('span', { className: 'text-xs font-medium leading-tight opacity-95' }, 'View Log')
            ),
            React.createElement('div', { className: 'flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10' },
                React.createElement('i', { className: 'fas fa-sign-out-alt text-lg mb-1 opacity-90' }),
                React.createElement('span', { className: 'text-xs font-medium leading-tight opacity-95' }, 'Logout')
            )
        )
    );
}

// Orientation Popup Component
function OrientationPopup({ 
    showOrientationPopup, 
    isPopupMinimized, 
    isPopupMaximized, 
    setIsPopupMinimized, 
    setIsPopupMaximized, 
    setShowOrientationPopup, 
    selectedOrientation, 
    setSelectedOrientation, 
    selectedTemplate 
}) {
    return React.createElement(React.Fragment, null,
        // Orientation Selection Popup
        showOrientationPopup && !isPopupMinimized && React.createElement('div', { 
            className: 'fixed inset-0 flex items-center justify-center z-[2000]' 
        },
            React.createElement('div', { 
                className: `${isPopupMaximized ? 'w-full h-full' : 'w-[270px] h-[300px]'} flex flex-col transition-all duration-200`,
                style: {
                    backgroundColor: 'rgba(240, 240, 240, 0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1.8px solid #59f9ff',
                    borderRadius: '0',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                    fontSize: '12px'
                }
            },
                // Popup Header
                React.createElement('div', { 
                    className: 'px-2 py-2 flex items-center justify-between text-sm text-black h-[35px] bg-transparent font-normal',
                    style: { paddingLeft: '9px' }
                },
                    React.createElement('span', null, 'Select Page Orientation'),
                    React.createElement('div', { className: 'flex gap-0' },
                        React.createElement('button', { 
                            className: 'bg-transparent border-none w-[35px] h-[35px] cursor-pointer text-xl text-black flex items-center justify-center font-bold transition-colors duration-200 hover:bg-gray-300',
                            style: { fontFamily: 'Segoe UI, sans-serif' },
                            onClick: () => {
                                setIsPopupMinimized(true);
                                setIsPopupMaximized(false);
                            }
                        }, '−'),
                        React.createElement('button', { 
                            className: 'bg-transparent border-none w-[35px] h-[35px] cursor-pointer text-xl text-black flex items-center justify-center font-bold transition-colors duration-200 hover:bg-gray-300',
                            style: { fontFamily: 'Segoe UI, sans-serif' },
                            onClick: () => setIsPopupMaximized(!isPopupMaximized)
                        }, isPopupMaximized ? '🗗' : '□'),
                        React.createElement('button', { 
                            className: 'bg-transparent border-none w-[35px] h-[35px] cursor-pointer text-xl text-black flex items-center justify-center font-bold transition-colors duration-200 hover:bg-red-500 hover:text-white',
                            style: { fontFamily: 'Segoe UI, sans-serif' },
                            onClick: () => {
                                setShowOrientationPopup(false);
                                setSelectedOrientation('Portrait');
                                setIsPopupMaximized(false);
                                setIsPopupMinimized(false);
                            }
                        }, '×')
                    )
                ),
                
                // Popup Content
                React.createElement('div', { 
                    className: 'flex-1 flex flex-col bg-transparent',
                    style: isPopupMaximized ? {
                        position: 'relative',
                        height: '100%',
                        backgroundColor: 'transparent'
                    } : {}
                },
                    // Orientation Section (centered)
                    React.createElement('div', { 
                        className: 'flex-1 flex flex-col justify-center items-center',
                        style: { padding: '30px 20px 20px 20px' }
                    },
                        React.createElement('div', { 
                            className: 'flex justify-center gap-12',
                            style: { marginBottom: '-20px' }
                        },
                            // Portrait Option
                            React.createElement('div', { 
                                className: `flex flex-col items-center cursor-pointer transition-all duration-200`,
                                style: { padding: '5px' },
                                onClick: () => setSelectedOrientation('Portrait')
                            },
                                React.createElement('div', { 
                                    className: 'flex items-center justify-center mb-3 border-none relative text-white transition-all duration-200',
                                    style: {
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: selectedOrientation === 'Portrait' ? '#20a8d8' : '#9e9e9e',
                                        fontSize: '24px'
                                    }
                                },
                                    React.createElement('i', { className: 'fas fa-bars', style: { transform: 'rotate(90deg)' } })
                                ),
                                React.createElement('span', { 
                                    className: 'text-gray-800',
                                    style: { 
                                        fontSize: '17px', 
                                        fontWeight: 'normal',
                                        fontFamily: 'Segoe UI, sans-serif'
                                    } 
                                }, 'Portrait')
                            ),
                            
                            // Landscape Option
                            React.createElement('div', { 
                                className: `flex flex-col items-center cursor-pointer transition-all duration-200`,
                                style: { padding: '5px' },
                                onClick: () => setSelectedOrientation('Landscape')
                            },
                                React.createElement('div', { 
                                    className: 'flex items-center justify-center mb-3 border-none relative text-white transition-all duration-200',
                                    style: {
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: selectedOrientation === 'Landscape' ? '#20a8d8' : '#9e9e9e',
                                        fontSize: '24px'
                                    }
                                },
                                    React.createElement('i', { className: 'fas fa-bars', })
                                ),
                                React.createElement('span', { 
                                    className: 'text-gray-800',
                                    style: { 
                                        fontSize: '17px', 
                                        fontWeight: 'normal',
                                        fontFamily: 'Segoe UI, sans-serif'
                                    } 
                                }, 'Landscape')
                            )
                        )
                    ),
                    
                    // Continue Section (bottom)
                    React.createElement('div', { 
                        className: 'text-center bg-transparent',
                        style: { 
                            padding: '15px 20px 20px 20px',
                            borderTop: 'none' 
                        }
                    },
                        React.createElement('button', { 
                            className: 'border-none cursor-pointer text-gray-800 transition-all duration-200 hover:bg-gray-300',
                            style: {
                                backgroundColor: '#dbdbdb',
                                padding: '15px 17px',
                                marginBottom: '-20px',
                                fontSize: '13px',
                                fontFamily: 'Segoe UI, sans-serif',
                                fontWeight: 'normal'
                            },
                            onClick: () => {
                                console.log('Creating template:', selectedTemplate, selectedOrientation);
                                setShowOrientationPopup(false);
                                setSelectedOrientation('Portrait');
                            }
                        }, 'Continue')
                    )
                )
            )
        ),

        // Minimized Popup Tab
        showOrientationPopup && isPopupMinimized && React.createElement('div', { 
            className: 'fixed bottom-2 left-[85px] px-3 py-1 cursor-pointer text-xs text-gray-800 z-[1500] rounded-t shadow-lg transition-all duration-200',
            style: {
                background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
                border: '1px solid #999',
                borderBottom: 'none',
                fontFamily: 'Segoe UI, sans-serif'
            },
            onClick: () => setIsPopupMinimized(false)
        },
            React.createElement('span', { className: 'whitespace-nowrap' }, 'Select Page Orientation')
        )
    );
}
