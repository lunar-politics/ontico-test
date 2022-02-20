async function loadEvents() {
  const response = await fetch('https://conf.ontico.ru/api/conferences/forCalendar.json');
  const allEvents = await response.json();
  return allEvents;
}


async function createEvent() {
  let events = await loadEvents();

  eventsNumber = events.result.length;

  console.log(events);
  console.log(eventsNumber);

  const eventList = document.querySelector('.events-list');

  for (let i = 0; i < eventsNumber; i++) {

    let event = document.createElement('li');
    event.classList.add('event');
    eventList.append(event);

    let eventDate = document.createElement('p');
    eventDate.classList.add('event__date');
    eventDate.textContent = events.result[i].date_range;
    event.append(eventDate);


    let eventLogo = document.createElement('img');
    eventLogo.classList.add('event__logo');
    eventLogo.setAttribute('src', events.result[i].logo);
    event.append(eventLogo);

    let eventTitle = document.createElement('h2');
    eventTitle.classList.add('event__title');
    eventTitle.textContent = (events.result[i].name).split('(')[0];
    event.append(eventTitle);

    let eventDescr = document.createElement('p');
    eventDescr.classList.add('event__descr');
    eventDescr.textContent = events.result[i].brief;
    event.append(eventDescr);

    let eventLocation = document.createElement('div');
    eventLocation.classList.add('event__location');
    eventLocation.textContent = events.result[i].location;
    event.append(eventLocation);

    let eventSite = document.createElement('a');
    eventSite.classList.add('event__site');
    eventSite.setAttribute('href', events.result[i].uri);
    eventSite.setAttribute('target', '_blank');
    eventSite.textContent = eventSite.host.replace(/^www\./, '');
    event.append(eventSite);

    let actionBlock = document.createElement('div');
    event.append(actionBlock);
    actionBlock.classList.add('event__action');

    let eventBtn = document.createElement('button');
    eventBtn.classList.add('btn-reset');
    eventBtn.classList.add('event__buy-btn');
    eventBtn.textContent = 'Купить билет';
    actionBlock.append(eventBtn);

    let eventMore = document.createElement('a');
    eventMore.classList.add('event__more');
    eventMore.setAttribute('href', events.result[i].uri);
    eventMore.setAttribute('target', '_blank');
    eventMore.textContent = 'Подробнее';
    actionBlock.append(eventMore);
  }
}

createEvent();

