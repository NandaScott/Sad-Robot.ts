export default abstract class AbstractEventListener<
  EventList extends Record<keyof EventList, any[]>,
  Event extends keyof EventList,
> {
  abstract event: Event;
  abstract exec(...args: EventList[Event]): void | Promise<void>;
}
