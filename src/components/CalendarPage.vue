<template>
    <div>
        <Header tabName="calendar"></Header>
        <v-app  id="dayspan" v-cloak>
                <ds-calendar-app :calendar="calendar" >
                    <template slot="title">
                        Calendars
                    </template>
                    <template slot="eventPopover" slot-scope="slotData">
                        <ds-calendar-event-popover
                                v-bind="slotData"
                                :read-only="readOnly"
                                @finish="saveState"
                        ></ds-calendar-event-popover>
                    </template>


                    <template slot="eventCreatePopover" slot-scope="{placeholder, calendar}">
                        <ds-calendar-event-create-popover
                                :calendar-event="placeholder"
                                :calendar="calendar"

                                @create-popover-closed="saveState"
                        ></ds-calendar-event-create-popover>
                    </template>

                    <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
                        <div>
                            <v-icon class="ds-ev-icon"
                                    v-if="details.icon"
                                    size="14"
                                    :style="{color: details.forecolor}">
                                {{ details.icon }}
                            </v-icon>
                            <strong class="ds-ev-title">{{ details.title }}</strong>
                        </div>
                        <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
                    </template>

                    <template slot="drawerBottom">
                        <div class="pa-3">
                            <FolderTreeView :filterFolderType="filter" />
                        </div>
                    </template>

                </ds-calendar-app>
        </v-app>
    </div>
</template>

<script>
    import Header from "./Header"
    import { FolderTypeEnum } from "@/_sxapi/Folder"
    import FolderTreeView from "./views/FolderTreeView"

    import Vue from 'vue'
    import Vuetify from 'vuetify'

    import { Calendar } from 'dayspan';
    Vue.use(Vuetify);
    import DaySpanVuetify from 'dayspan-vuetify'
    Vue.use(DaySpanVuetify, {
        methods: {
            getDefaultEventColor: () => '#1976d2'
        }
    });

    export default {
        name: 'CalendarPage',
        components: {
            Header,
            FolderTreeView
        },
        data: () => ({
            storeKey: 'dayspanState',
            calendar: Calendar.months(),
            readOnly: false,
            defaultEvents: [],
            filter: FolderTypeEnum.Calendar
        }),
        mounted()
        {
            if (this.$route.params.folderdref) {
                this.$store.dispatch('mailbox/setCurrentFolder', this.$route.params.folderdref);
            }
            this.loadState();
        },
        beforeRouteLeave (to, from, next) {
            this.$store.dispatch('mailbox/setCurrentFolder', null);
            next();
        },
        methods:
            {
                getCalendarTime(calendarEvent)
                {
                    let sa = calendarEvent.start.format('a');
                    let ea = calendarEvent.end.format('a');
                    let sh = calendarEvent.start.format('h');
                    let eh = calendarEvent.end.format('h');
                    if (calendarEvent.start.minute !== 0)
                    {
                        sh += calendarEvent.start.format(':mm');
                    }
                    if (calendarEvent.end.minute !== 0)
                    {
                        eh += calendarEvent.end.format(':mm');
                    }
                    return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
                },
                saveState()
                {
                    let state = this.calendar.toInput(true);
                    let json = JSON.stringify(state);
                    localStorage.setItem(this.storeKey, json);
                },
                loadState()
                {
                    let state = {};
                    try
                    {
                        let savedState = JSON.parse(localStorage.getItem(this.storeKey));
                        if (savedState)
                        {
                            state = savedState;
                            state.preferToday = false;
                        }
                    }
                    catch (e)
                    {
                        // eslint-disable-next-line
                        console.log( e );
                    }
                    if (!state.events || !state.events.length)
                    {
                        state.events = this.defaultEvents;
                    }
                    state.events.forEach(ev =>
                    {
                        let defaults = this.$dayspan.getDefaultEventDetails();
                        ev.data = Vue.util.extend( defaults, ev.data );
                    });
                    this.$refs.app.setState( state );
                }
            }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .v-toolbar--fixed {
        position: absolute !important;
    }
</style>
