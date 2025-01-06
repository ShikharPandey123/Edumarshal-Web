export default function timeAgo(date) {
    const millisecondsDiff = date - new Date();
    const secondsDiff = Math.abs(millisecondsDiff) / 1000;
    const interval = Math.floor(secondsDiff / 3600);

    if (interval > 24) {
        const days = Math.floor(interval / 24);
        if (days > 30) {
            const months = Math.floor(days / 30);
            if (millisecondsDiff < 0) {
                if (months === 1) {
                    return "1 month ago";
                } else {
                    return months + " months ago";
                }
            } else if (millisecondsDiff === 0) {
                return "Now";
            } else {
                if (months === 1) {
                    return "In 1 month";
                } else {
                    return "In " + months + " months";
                }
            }
        } else {
            if (millisecondsDiff < 0) {
                if (days === 1) {
                    return "1 day ago";
                } else {
                    return days + " days ago";
                }
            } else if (millisecondsDiff === 0) {
                return "Now";
            } else {
                if (days === 1) {
                    return "In 1 day";
                } else {
                    return "In " + days + " days";
                }
            }
        }
    } else {
        if (millisecondsDiff < 0) {
            if (interval === 1) {
                return "1 hour ago";
            } else {
                return interval + " hours ago";
            }
        } else if (millisecondsDiff === 0) {
            return "Now";
        } else {
            if (interval === 1) {
                return "In 1 hour";
            } else {
                return "In " + interval + " hours";
            }
        }
    }
}
