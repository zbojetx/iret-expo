const initialState = {
    loading: false,
    colors: [
        'color1',
        'color2',
        'color3',
        'color4',
        'color5',
        'color6',
        'color7',
        'color8',
        'color9',
        'color10',
        'color11',
        'color12',
    ],
    floors: [
        {
            name: 'Floor',
            width: 100,
            height: 100,
        }
    ],
    rooms: [
        /* this is example room data
        {
          name: 'Room Name',
          color: 'color1',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          depth: 100,
          isOverlap: false,
        } 
        */
    ],
    show3D: false,
    doors: [],
    windows: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "ADD_ROOM":
            return {
                ...state,
                rooms: [...state.rooms, action.payload],
            }
        case "UPDATE_ROOM":
            return {
                ...state,
                rooms: state.rooms.map(obj => {
                    if (obj.name === action.payload.name) return ({ ...obj, ...action.payload })
                    return obj
                }),
            }
        case "ADD_DOOR":
            return {
                ...state,
                doors: [...state.doors, action.payload],
            }
        case "UPDATE_DOOR":
            return {
                ...state,
                doors: state.doors.map(obj => {
                    if (obj.id === action.payload.id) return ({ ...obj, ...action.payload })
                    return obj
                }),
            }
        case "SHOW_3D":
            return {
                ...state,
                show3D: !state.show3D
            }
        default:
            return state
    }
}