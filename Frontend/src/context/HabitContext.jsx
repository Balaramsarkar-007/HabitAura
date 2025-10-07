import React, { createContext, useContext, useReducer, useEffect} from "react";
import {format, isToday, subDays, startOfMonth, endOfMonth,eachDayOfInterval} from 'date-fns';
import { habitAPI } from "../services/habitAPI";
import {toast} from 'react-toastify'
import { useAuth } from "./AuthContext";

// create context
const HabitContext = createContext();

// initial state
const initialState = {
    user : {
        id : '',
        name : '',
        email : '',
    },
    habits : [],
    loading : false,
    error : null
};

// reducer function
const habitReducer = (state, action) => {

    switch (action.type) {
        case 'SET_LOADING' :
            return { ...state, loading: action.payload };

        case 'SET_ERROR':
            return { ...state, error: action.payload , loading: false};

        case 'CLEAR_ERROR':
            return { ...state, error : null};
            
        case 'SET_USER':
            return { ...state, user: action.payload };
            
        case 'SET_HABITS':
            return { ...state, habits: action.payload, loading: false };    

        // add habits feature
        case 'ADD_HABIT':
            return {
                ...state,
                habits : [ ...state.habits, { ...action.payload, _pending: true } ],
                loading : false
            }  
            
        case 'ADD_HABIT_SUCCESS':
            return {
                ...state,
                habits: state.habits.map(habit =>
                    habit._tempId === action.payload.tempId 
                    ? {...action.payload.habit, _pending : false} 
                    : habit
                )
            }            
            
        case 'ADD_HABIT_FAILURE':
            return {
                ...state,
                habits : state.habits.filter(habit => habit._tempId !== action.payload.tempId),
                error : action.payload.error
            }    

        case 'MARK_AS_DONE' :
            return {
                ...state,
                habits : state.habits.map(habit => 
                    habit._id === action.payload.id
                    ? {
                        ...habit,
                        current : habit.current + 1,
                        complatedDates : [ ...habit.complatedDates, action.payload.date],
                        isCompleted : habit.current + 1 >= habit.target,
                        _pending : true,
                    } : habit
                )
            }  
            
        case 'MARK_AS_DONE_SUCCESS' :
            return {
                ...state,
                habits : state.habits.map(habit => 
                    habit._id === action.payload.id
                    ? { ...habit, _pending : false} : habit
                )
            };    

        case 'MARK_AS_DONE_FAILURE' :
            console.log('Payload in failure in : ', action.payload);
            return {
                ...state,
                habits : state.habits.map(habit => 
                    habit._id === action.payload.id
                    ? {
                        ...habit,
                        current : habit.current - 1,
                        complatedDates : habit.complatedDates.filter(date => date !== action.payload.date),
                        isCompleted : habit.current - 1 >= habit.target,
                        _pending : false,
                    } : habit
                ),
                error : action.payload.error
            } 
            
        case 'DELETE_HABIT' :
            return {
                ...state,
                habits : state.habits.filter(habit => habit._id !== action.payload),
                loading : false
            } 
                

        case 'EDIT_HABIT' :
            return {
                ...state,
                
                habits : state.habits.map(habit =>
                    habit._id === action.payload._id
                    ? { ...habit, ...action.payload, _pending : true} : habit
                ) 
            }

        case 'EDIT_HABIT_SUCCESS' :
            return {
                ...state,
                habits : state.habits.map(habit =>
                    habit._id === action.payload._id
                    ? { ...habit, ...action.payload, _pending : false} : habit
                )
            };
            
        case 'EDIT_HABIT_FAILURE' :
            return {
                ...state,
                habits : state.habits.map(habit =>
                    habit._id === action.payload.originalData._id
                    ? { ...action.payload.originalData, _pending: false} : habit
                ),
                error : action.payload.error
            };

        case 'DISABLE_REMINDER' :
            return {
                ...state,
                habits : state.habits.map(habit =>
                    habit._id === action.payload
                    ? { ...habit, reminder : { ...habit.reminder, active : false }, _pending : true } : habit
                )
            }

        case 'DISABLE_REMINDER_SUCCESS' :
            return {
                ...state,
                habits : state.habits.map(habit =>
                    habit._id === action.payload
                    ? { ...habit, _pending : false } : habit
                )
            }    

        case 'DISABLE_REMINDER_FAILURE' :
            return {
                ...state,
                habits : state.habits.map(habit => 
                    habit._id === action.payload.id
                    ? { ...habit, reminder : { ...habit.reminder, active : true }, _pending : false } : habit
                ),
                error : action.payload.error
            }    

        case 'EDIT_REMINDER' :
            return {
                ...state,
                habits : state.habits.map(habit => 
                    habit._id === action.payload.id
                    ? { ...habit, reminder : { ...habit.reminder, ...action.payload.reminder}, _pending : true } : habit
                )
            }

        case 'EDIT_REMINDER_SUCCESS' :
            return {
                ...state,
                habits : state.habits.map(habit => 
                    habit._id === action.payload.id
                    ? { ...habit, reminder : { ...habit.reminder, ...action.payload.reminder}, _pending : false } : habit
                )
            }

        case 'EDIT_REMINDER_FAILURE' :
            return {
                ...state,
                habits : state.habits.map(habit =>
                    habit._id === action.payload.originalData._id
                    ? { ...action.payload.originalData, _pending : false } : habit
                ),
                error : action.payload.error
            }    

        default :
            return state;
    }
}

export const HabitProvider = ({ children}) => {
    const [habitState, dispatch ] = useReducer(habitReducer, initialState);
    const { user } = useAuth();
    // console.log(habitState);

    // load the intial data whiling loading
    useEffect(() => {
        const loadInitialData = async () => {
            await loadUser();
            await loadHabits();
        }
        loadInitialData();
        // console.log("Initial user id in habit context : ", initialState.user.id);
    },[user?.id]);

    // load intitial state data 
    const loadUser = async () => {
        try {   
            dispatch({ type : 'SET_LOADING', payload: true});
            const user = await habitAPI.getUser();
            dispatch({ type : 'SET_USER', payload : user.user})
        } catch (error) {
            dispatch({ type : 'SET_ERROR', payload : error.message })
        }
    }

    const loadHabits = async () => {
        try {
            dispatch({ type : 'SET_LOADING', payload: true});
            const allhabits = await habitAPI.getHabits();
            dispatch({ type : 'SET_HABITS', payload : allhabits.habits})
        } catch (error) {
            dispatch({ type : 'SET_ERROR', payload : error.message })
        }
    }

    const addHabit = async (data) => {
        const tempId = Date.now();
        const demoData = {
            ...data,
            id: tempId,
            _tempId : tempId,
            current : 0,
            complatedDates : [],
            isCompleted : false,
        };

        try {
            dispatch({ type : 'SET_LOADING', payload: true});
            dispatch({ type : 'ADD_HABIT', payload : demoData});

            // call api
            const newHabit = await habitAPI.createHabit(data);
            console.log("New habit created: ", newHabit);

            // sucesses update
            dispatch({
                type : "ADD_HABIT_SUCCESS",
                payload : { tempId, habit : newHabit.habit }
            });
            toast.success("Habit added successfully");
        } catch (error) {
            // rollback the changes
            console.log("Error in adding habit: ", error);
            dispatch({
                type : 'ADD_HABIT_FAILURE',
                payload : {tempId, error : error.message }
            })
            toast.error(error.message || "Something went wrong, please try later");
        }
    }

    const markAsDone = async (id) => {
        const today = format(new Date(), 'dd-MM-yyyy');
        const data = { id, date: today };
        
        try {
            dispatch({ type: 'MARK_AS_DONE', payload: data });
            await habitAPI.markAsDone(data);
            dispatch({ type: 'MARK_AS_DONE_SUCCESS', payload: { id } });
        } catch (error) {
            dispatch({ type: 'MARK_AS_DONE_FAILURE', payload: { ...data, error: error.message } });
        }
    }

    const deleteHabit = async (id) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            await habitAPI.deleteHabit(id);
            dispatch({ type: 'DELETE_HABIT', payload: id });
            toast.success("Habit deleted successfully");
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            toast.error(error.message || "Something went wrong, please try later");
        }
    }

    const editHabit = async (data) => {
        const originalHabit = habitState.habits.find(habit => habit._id === data._id);
        try {
            dispatch({ type: 'EDIT_HABIT', payload: data });

            const updatedHabit = await habitAPI.editHabit(data);

            dispatch({ type: 'EDIT_HABIT_SUCCESS', payload: updatedHabit.habit });
            toast.success("Habit updated successfully");
        } catch (error) {
            dispatch({ type: 'EDIT_HABIT_FAILURE', payload: { originalData : originalHabit, error: error.message } });
            toast.error(error.message || "Something went wrong, please try later");
        }
    }

    const disableReminder = async (id) => {
        try {
            dispatch({ type: 'DISABLE_REMINDER', payload: id });
            await habitAPI.disableReminder(id);
            dispatch({ type: 'DISABLE_REMINDER_SUCCESS', payload: id });
            toast.success("Reminder disabled successfully");
        } catch (error) {
            dispatch({ type: 'DISABLE_REMINDER_FAILURE', payload: { id, error: error.message } });
            toast.error("Something went wrong, please try later");  
        }
    }

    const editReminder = async (data) => {
        const originalHabit = habitState.habits.find(habit => habit._id === data.id);
        console.log("habit in edit reminder : ", data);
        try {
            dispatch({ type: 'EDIT_REMINDER', payload: data });
            await habitAPI.editReminder(data);
            dispatch({ type: 'EDIT_REMINDER_SUCCESS', payload: data });
            toast.success("Reminder updated successfully");
        } catch (error) {
            dispatch({ type: 'EDIT_REMINDER_FAILURE', payload: { originalData : originalHabit, error: error.message } });
            toast.error(error.message || "Something went wrong, please try later");
        }
    }

    const weaklyProgress = [];
    for (let i=6; i>=0; i--) {
        const currCompleted = habitState.habits.reduce((acc, habit) => acc + (habit.complatedDates.includes(format(subDays(new Date(), i), 'dd-MM-yyyy')) ? 1 : 0), 0);
        let progressData = {
            date : format(subDays(new Date(), i), 'MMM dd'),
            day : format(subDays(new Date(), i), 'eee'),
            completed : currCompleted,
            percentage : Math.round(currCompleted/(habitState.habits.length || 1) * 100) || 0
        }
        weaklyProgress.push(progressData);
    }
    

    // category stats
    const categoryStats = [];
    const habitCategoryColor = [
        { name: 'fitness', color: '#059669' },                         
        { name: 'health', color: '#ea580c' },
        { name: 'productivity', color: '#0284c7' },
        { name: 'learning', color: '#2563eb' },
        { name: 'mindfulness', color: '#4ade80' },
        { name: 'lifestyle', color: '#0284c7' },
        { name: 'creativity', color: '#0284c7' },
        { name: 'others', color: '#2563ea' },
    ];

    // More efficient approach - single pass through habits
    const categoryData = new Map();

    habitState.habits.forEach(habit => {
        const { category, current, complatedDates } = habit;
        const todayFormatted = format(new Date(), 'dd-MM-yyyy');
        const isCompletedToday = complatedDates.includes(todayFormatted);
        
        if (!categoryData.has(category)) {
            categoryData.set(category, {
                count: 0,
                totalStreak: 0,
                completedToday: 0
            });
        }
        
        const data = categoryData.get(category);
        data.count++;
        data.totalStreak += current;
        data.completedToday += isCompletedToday ? 1 : 0;
    });

    // Convert to final format
    for (const [name, data] of categoryData) {
        const color = habitCategoryColor.find(cat => cat.name === name)?.color || '#000000';
        const catPer = Math.round((data.count / habitState.habits.length) * 100);
        const avgStreak = Math.round(data.totalStreak / data.count);
        const catPerComplitions = Math.round((data.completedToday / data.count) * 100);
        categoryStats.push({ name, count: data.count, color, catPer, avgStreak, catPerComplitions });
    }

    // calneder completion days
    const calenderDays = eachDayOfInterval({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
    });

    const monthDays = calenderDays.map(day => {
        const today = format(day, 'dd-MM-yyyy');
        const completedHabits = habitState.habits.filter(habit => habit.complatedDates.includes(today)).length;

        return {
            date : format(day, 'd'),
            completed : completedHabits,
            total : habitState.habits.length,
            complitionPer : Math.round((completedHabits / (habitState.habits.length || 1)) * 100),
        }
    });


    const values = {
        habits : habitState.habits,
        dispatch,
        addHabit,
        markAsDone,
        deleteHabit,
        editHabit,
        habitStats: {
            totalHabits: habitState.habits.length || 0,
            totalActiveHabits : habitState.habits.reduce((acc, habit) => acc + (habit.isCompleted ? 0 : 1), 0) || 0,
            achievements: habitState.habits.reduce((acc, habit) => acc + (habit.isCompleted  ? 1 : 0), 0) || 0,
            totalProgress: Math.round(habitState.habits.reduce((acc, habit) => acc + (habit.current / habit.target) * 100, 0) / (habitState.habits.length || 1)) || 0,
            currentStreak : habitState.habits.reduce((acc, habit) => habit.current > acc ? habit.current : acc, 0) || 0,
            activeReminders : habitState.habits.reduce((acc, habit) => acc + (habit.reminder.active ? 1 : 0), 0) || 0,
            todayComplated : habitState.habits.reduce((acc, habit) => acc + (habit.complatedDates.includes(format(new Date(), 'dd-MM-yyyy')) ? 1 : 0), 0) || 0,
        },
        weaklyProgress,
        categoryStats,
        monthlyActivity: monthDays,
        disableReminder,
        editReminder,
        error : habitState.error, 
        loading: habitState.loading,
        user : habitState.user,
    }
    return (
        <HabitContext.Provider value={values}>
            {children}
        </HabitContext.Provider>
    )
}

// custom hook
export const useHabit = () => {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error("useHabits must be used within a HabitProvider");
    }
    return context;
}

export default HabitContext;