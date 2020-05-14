/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

/**
 *
 * @author Matthew
 */
public class timeSlotReservedException extends Exception {
    
    public timeSlotReservedException(String message) {
        super(message);
    }
    
    public timeSlotReservedException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
