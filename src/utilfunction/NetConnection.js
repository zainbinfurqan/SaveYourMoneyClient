import React, { useEffect, useState } from 'react';

export default function NetConnection() {
    if (navigator.onLine) {
        return true
    }
    else {
        return false
    }
}