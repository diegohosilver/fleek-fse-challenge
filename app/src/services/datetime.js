import moment from 'moment';
import 'moment-timezone';

export class DateTime {

    constructor(datetime = new Date(), timezone = moment.tz.guess()) {

        this.value = moment(datetime);

        this.timezone = timezone;
    }

    formatAsFriendlyLong() {

        let formatString;

        if (this.isToday()) {

            formatString = "[Today] h:mm A";
        } else if (this.isYesterday()) {

            formatString = "[Yesterday] h:mm A";
        } else if (this.isTomorrow()) {

            formatString = "[Tomorrow] h:mm A";
        } else if (this.isFuture()) {

            formatString = "ddd, MMM D, YYYY h:mm A";
        } else {

            formatString = "MMM D, YYYY h:mm A";
        }

        return moment.tz(this.value, this.timezone).locale('en-ci').format(formatString);

    }

    formatAsFriendlyShort() {

        if (this.isOlderThan1Day()) {

            return this.formatAsShortAbsolute();
        }

        return this.isWithin7Days()

            ? this.formatAsShortRelative()

            : this.formatAsShortAbsolute();
    }

    formatAsShortAbsolute() {

        let formatString = "MMM D";

        if (!this.isInSameYear()) formatString += ", YYYY";

        return moment.tz(this.value, this.timezone).locale('en-ci').format(formatString);
    }

    formatAsShortRelative() {

        return this.value.locale('en-ci').fromNow();
    }

    formatAsISOString() {

        return this.value.toISOString();
    }

    isFuture() {

        return moment().isBefore(this.value);
    }

    isOlderThan1Day() {

        return Math.floor(moment.duration(moment().diff(this.value)).asDays()) >= 1;
    }

    isOlderThan1Hour() {

        return Math.floor(moment.duration(moment().diff(this.value)).asHours()) >= 1;
    }

    isToday() {

        return this.value.isSame(moment(), 'day');
    }

    isTomorrow() {

        return this.value.isSame(moment().add(1, 'days'), 'day');
    }

    isWithin7Days() {

        return Math.abs(Math.floor(moment.duration(moment().diff(this.value)).asDays())) <= 7;
    }

    isYesterday() {

        return this.value.isSame(moment().subtract(1, 'days'), 'day');
    }

    isInSameYear() {

        return this.value.year() === moment().year();
    }

    static today() {

        return new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        );
    }
}