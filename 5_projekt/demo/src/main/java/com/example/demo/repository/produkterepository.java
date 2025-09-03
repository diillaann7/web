package com.example.demo.repository;

public interface produkterepository extends JpaRepository<produkte, Long> {
    Optional<produkte> findByName(String name);
}
